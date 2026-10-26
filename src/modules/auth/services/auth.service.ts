import { SignupDto, SignUpUserDto } from 'src/modules/auth/dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/schemas';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { SocialSignupDto } from '../dto/socialSignUp.dto';
import { FirebaseStorageService, OpenAIService } from 'src/services';
import { SignUpUser } from 'src/modules/user/schemas/signupUsers.schema';
import { randomUUID } from 'crypto';
import { appearanceResponseFormat, faceSacanPrompt } from 'src/commons/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(SignUpUser.name) private signupUserModel: Model<SignUpUser>,
    private jwtService: JwtService,
    private readonly firebaseStorageService: FirebaseStorageService,
    private readonly openAIService: OpenAIService,

  ) {}

  private createToken(user: any): string {
    const payload: JwtPayloadDto = {
      id: user._id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  generateOTP(digits: number): string {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString().padStart(digits, '0');
  }

  async getUser(userId?: string, email?: string) {
    const query = email
      ? this.userModel.findOne({ email: email.toLowerCase() })
      : this.userModel.findById(userId);
    const result: any = await query
      .select(
        '-password -socialId -socialLogin -isDeleted -referredBy -referredUsers -__v -createdAt -updatedAt -premiumExpiry -isPremium -fcmTokens -pictures -skinCareJSON -nutritionPlanJSON -fitnessPlanJSON -waterJSON',
      )
      .lean()
      .exec();
    if (result && result.profilePicture) {
      const profilePicLink = await this.firebaseStorageService.getSignedUrl(
        `users/${result.profilePicture.uuid}`,
      );
      result.profilePicture.link = profilePicLink;
    }
    if (result && result.bodyScan) {
      const profilePicLink = await this.firebaseStorageService.getSignedUrl(
        `users/${result.bodyScan.uuid}`,
      );
      result.bodyScan.link = profilePicLink;
    }
    const current = result.appearanceJSON?.overallRating ?? null;
    const prev = result.prevOverallRating ?? null;

    result.percentageChange =
      current != null && prev != null && prev > 0
        ? ((current - prev) / prev) * 100
        : null;
    return result;
  }

  async seedUser(signupDto: SignupDto) {
    const { email, firstName, lastName, password, contactNumber } = signupDto;
    const role = 'admin';
    const checkEmail = await this.getUser(undefined, email);
    if (checkEmail) {
      throw new BadRequestException(['User already exist']);
    }
    const referralCode = crypto.randomBytes(4).toString('hex');
    return await this.userModel.create({
      email: email.toLowerCase(),
      password,
      referralLink: referralCode,
      profileDetails: {
        address: 'Coloumbia canada',
        calculatedAge: 0,
        city: 'Colombia',
        country: 'Canada',
        dob: '1998-05-13',
        firstName,
        fullName: 'Gabe Nelson',
        gender: 'male',
        interests: ['Afghanistan', 'Pakistan', 'India'],
        lastName,
        contactNumber,
        username: 'gabe_13',
      },
      role,
      profileSetup: true,
    });
  }

  async socialLogin(body: SocialSignupDto) {
    const { email, socialId, socialType, signupUserId } = body;
    // const userCheck = (await this.getUser(undefined, email)) as any;
    const userCheck = (await this.userModel.findOne({ socialId })) as any;
    if (userCheck) {
      if (userCheck.socialType !== socialType) {
        throw new BadRequestException(['Social type mismatch.']);
      }
      const token = this.createToken(userCheck);
      return { token, user: await this.getUser(userCheck?._id) };
    }
    if (email) {
      const emailCheck: any = await this.userModel.findOne({ email });
      if (emailCheck) {
        if (emailCheck?.socialType == socialType) {
          emailCheck.socialId = socialId;
          emailCheck.socialType = socialType;
          await emailCheck.save();
          const token = this.createToken(emailCheck);
          return {
            token,
            user: await this.getUser(emailCheck?._id),
          };
        } else {
          throw new BadRequestException(['Account already exists']);
        }
      }
    }
    const referralCode = crypto.randomBytes(4).toString('hex');
    if (signupUserId == '') {
      throw new BadRequestException(['Please signup first.']);
    }
    const signupUser = await this.signupUserModel.findById(signupUserId);
    if (!signupUser) {
      throw new BadRequestException(['Please signup first.']);
    }

    const user: any = await this.userModel.create({
      email: email?.toLowerCase(),
      socialId,
      socialType,
      referralLink: referralCode,
      role: 'customer',
      name: signupUser.name,
      ageInYears: signupUser.ageInYears,
      dob: signupUser.dob,
      goals: signupUser.goals,
      workingOut: signupUser.workingOut,
      height: signupUser.height,
      weight: signupUser.weight,
      desireWeight: signupUser.desireWeight,
      allowPushNotification: signupUser.allowPushNotification,
      referredBy: signupUser.referredBy,
      profilePicture: signupUser.profilePicture,
      appearanceJSON: signupUser.appearanceJSON,
    });

    if (signupUser.referredBy) {
      const referral = await this.userModel.findById(signupUser.referredBy);
      if (!referral) {
        throw new BadRequestException(['Invalid referral link']);
      }
      const bonus = Number(process.env.REFERRAL_BONUS);

      if (isNaN(bonus)) {
        throw new Error(
          'REFERRAL_BONUS environment variable must be a valid number',
        );
      }

      referral.referralBonus += bonus;
      referral.referredUsers.push(user.id);
      await referral.save();
    }
    const token = this.createToken(user);
    return { token, user: await this.getUser(user?._id) };
  }

  async create(body: SignUpUserDto) {
    const {
      name,
      ageInYears,
      height,
      allowPushNotification,
      referralLink,
      file,
    } = body;
    let referral: User;
    if (referralLink) {
      referral = await this.userModel.findOne({ referralLink });
      if (!referral) {
        throw new BadRequestException(['Invalid referral link']);
      }
    }

    const profile = await this.firebaseStorageService.uploadFile(
      file,
      randomUUID(),
      'users',
    );

    const link = await this.firebaseStorageService.getSignedUrl(
      `users/${profile.uuid}`,
    );
    const openAIResponse = await this.openAIService.analyzeImage(
      link,
      faceSacanPrompt,
      JSON.stringify(appearanceResponseFormat, null, 2)
    );
    const signUpUser = await this.signupUserModel.create({
      name,
      ageInYears,
      height,
      referredBy: referralLink ? referral.id : null,
      allowPushNotification: allowPushNotification || false,
      profilePicture: profile,
      appearanceJSON: openAIResponse,
    });

    return signUpUser;
  }
}
