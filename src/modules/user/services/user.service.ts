import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserActivityHistory,
  UserPictureRecord,
  WithdrawalRequest,
} from '../schemas';
import { randomUUID } from 'crypto';
import { CreateProfilePictureDto } from '../dto/create-profile-picture.dto';
import { UpdateProfilePictureDto } from '../dto/update-profile-pictures.dto';
import {
  ChangeRequestStatusDto,
  CreateRequestDto,
  FindAllRequestsDto,
  OpenAiPromptTypeDto,
  UserProfileDto,
} from '../dto';
import { findAll, FirebaseStorageService, OpenAIService } from 'src/services';
import {
  appearanceResponseFormat,
  faceSacanPrompt,
  pictureType,
  requestStatus,
} from 'src/commons/constants';
import { UserOpenAiRecord } from '../schemas/userOpenAiRecord.schema';
import { PromptType } from 'src/modules/openai/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserOpenAiRecord.name)
    private userOpenAiRecordModel: Model<UserOpenAiRecord>,
    @InjectModel(UserPictureRecord.name)
    private userPictureModel: Model<UserPictureRecord>,
    @InjectModel(WithdrawalRequest.name)
    private withdrawalRequestModel: Model<WithdrawalRequest>,
    @InjectModel(UserActivityHistory.name)
    private userActivityRecordModel: Model<UserActivityHistory>,
    private readonly firebaseStorageService: FirebaseStorageService,
    private readonly openAIService: OpenAIService,
  ) {}

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

  async getUserImageLink(userId) {
    const result: any = await this.userModel
      .findById(userId)
      .select('profilePicture');
    if (!result) {
      throw new BadRequestException(['No User found']);
    }
    if (result.profilePicture) {
      const profilePicLink = await this.firebaseStorageService.getSignedUrl(
        `users/${result.profilePicture.uuid}`,
      );
      return profilePicLink;
    }
    return null;
  }

  async getUserAIJSON(userId, type) {
    const result = await this.userModel
      .findById(userId)
      .select(
        'appearanceJSON skinCareJSON nutritionPlanJSON fitnessPlanJSON waterJSON',
      );
    if (!result) {
      throw new BadRequestException(['No User found']);
    }
    switch (type) {
      case 'faceScan':
        return result.appearanceJSON;
      case 'skinCare':
        return result.skinCareJSON;
      case 'nutritionPlan':
        return result.nutritionPlanJSON;
      case 'fitnessPlan':
        return result.fitnessPlanJSON;
      case 'water':
        return result.waterJSON;
      default:
        return null;
    }
  }

  async create(user: any, body: UserProfileDto) {
    const userCheck = await this.userModel.findById(user.id);
    if (!userCheck) {
      throw new BadRequestException(['No User found']);
    }
    const {
      name,
      ageInYears,
      dob,
      goals,
      workingOut,
      height,
      weight,
      desireWeight,
      allowPushNotification,
      referralLink,
      fcmToken,
    } = body;
    let referral: User;
    if (referralLink) {
      referral = await this.userModel.findOne({ referralLink });
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
    let fcmTokens =
      userCheck?.fcmTokens?.length > 0 ? userCheck?.fcmTokens : [];
    if (fcmToken) {
      fcmTokens.push(fcmToken);
    }
    await this.userModel.findByIdAndUpdate(userCheck._id, {
      name,
      ageInYears,
      dob,
      goals,
      workingOut,
      height,
      weight,
      desireWeight,
      fcmTokens: [...new Set(fcmTokens)],
      referredBy: referralLink ? referral.id : null,
      allowPushNotification: allowPushNotification || false,
      profileSetup: true,
    });
    return await this.getUser(user.id);
  }

  async createProfilePicture(user: any, body: CreateProfilePictureDto) {
    const userCheck = await this.userModel.findById(user.id);
    const { file, bodyScan, attachments } = body;

    if (!userCheck) {
      throw new BadRequestException(['No User found']);
    }

    let profile: any = userCheck.profilePicture;

    if (file) {
      profile = await this.firebaseStorageService.uploadFile(
        file,
        randomUUID(),
        'users',
      );
      if (userCheck.profilePicture) {
        await this.userPictureModel.create({
          userId: userCheck._id,
          picture: userCheck.profilePicture,
          type: pictureType.PROFILE,
        });
      }
      // Run the OpenAI API call **in the background**

      const link = await this.firebaseStorageService.getSignedUrl(
        `users/${profile.uuid}`,
      );
      const openAIResponse = await this.openAIService.analyzeImage(
        link,
        faceSacanPrompt,
        JSON.stringify(appearanceResponseFormat, null, 2),
      );
      userCheck.prevOverallRating =
        userCheck?.appearanceJSON?.overallRating ?? 0;
      await this.userOpenAiRecordModel.create({
        userId: userCheck._id,
        type: PromptType.FACE_SCAN,
        openAiResponse: userCheck.appearanceJSON,
      });
      userCheck.appearanceJSON = openAIResponse;
      await userCheck.save();
      console.log('AI analysis saved.');
    }
    let bodyScanPicture = userCheck.bodyScan;
    if (bodyScan) {
      bodyScanPicture = await this.firebaseStorageService.uploadFile(
        bodyScan,
        randomUUID(),
        'users',
      );
      if (userCheck.bodyScan) {
        await this.userPictureModel.create({
          userId: userCheck._id,
          picture: userCheck.bodyScan,
          type: pictureType.BODY_SCAN,
        });
      }
    }
    const pictures = [...(userCheck.pictures || [])];

    if (attachments?.length) {
      const profilePictures = await Promise.all(
        attachments.map((file) =>
          this.firebaseStorageService.uploadFile(file, randomUUID(), 'users'),
        ),
      );
      pictures.push(...profilePictures);
    }

    // Immediately update profile picture and attachments
    await this.userModel.findByIdAndUpdate(userCheck._id, {
      profilePicture: profile,
      bodyScan: bodyScanPicture,
      pictures,
    });

    return this.getUser(user.id);
  }

  async updateProfilePictures(user: any, body: UpdateProfilePictureDto) {
    const userCheck = await this.getUser(user.id);
    if (!userCheck) {
      throw new BadRequestException(['No User found']);
    }

    const { file, attachments, removeUuids } = body;
    let pictures = userCheck.pictures || [];

    if (file) {
      const profile = await this.firebaseStorageService.uploadFile(
        file,
        randomUUID(),
        'users',
      );
      // const link = this.firebaseStorageService.getPreSignedUrl(profile.uuid, 'users');

      await this.userModel.findByIdAndUpdate(userCheck._id, {
        profilePicture: { ...profile },
      });
    }

    if (attachments?.length) {
      const profilePictures = await Promise.all(
        attachments.map(async (attachment) => {
          return await this.firebaseStorageService.uploadFile(
            attachment,
            randomUUID(),
            'users',
          );
        }),
      );

      const data = profilePictures.map((pic) => {
        // const link = this.firebaseStorageService.getPreSignedUrl(pic.uuid, 'users');
        return { ...pic };
      });

      pictures.push(...data);
    }

    if (removeUuids?.length) {
      const uuidsToRemove = new Set(removeUuids);
      const picturesToKeep = pictures.filter(
        (pic: any) => !uuidsToRemove.has(pic.uuid),
      );
      pictures = picturesToKeep;
    }

    await this.userModel.findByIdAndUpdate(userCheck._id, { pictures });
    return { message: 'Profile updated successfully' };
  }

  async updateLastSeen(userId) {
    return this.userModel.findByIdAndUpdate(userId, {
      lastSeen: new Date(Date.now()),
    });
  }

  async checkUsersIds(userIds, field) {
    const users = [];
    let flag = false;
    await Promise.all(
      userIds.map(async (user) => {
        const userCheck = await this.getUser(user);

        if (!userCheck) {
          flag = true;
        } else {
          if (!users.includes(user)) {
            users.push(user);
          }
        }
      }),
    );

    if (flag) {
      throw new BadRequestException([`One of the ${field} is invalid`]);
    }
    return users;
  }

  async deleteUser(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    await user.deleteOne();
    return { message: 'User deleted successfully' };
  }

  async findAllRequests(user, queryData: FindAllRequestsDto) {
    const { search, limit, page } = queryData;
    // Build query
    const query: any = {};
    if (user.role !== 'admin') {
      query.$and = [{ createdBy: user.id }];
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch places with the constructed query
    const data = await findAll(
      this.withdrawalRequestModel,
      limit,
      search,
      page,
      [],
      query,
      [],
      ['createdBy'],
      {},
    );

    return data;
  }

  async withdrawReferralBonus(userId, body: CreateRequestDto) {
    const { amount, email } = body;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }

    console.log(user);
    if (!user?.referralBonus || amount > user.referralBonus) {
      throw new BadRequestException(['Insufficient balance']);
    }

    const userRequests = await this.withdrawalRequestModel.findOne({
      createdBy: userId,
      status: 'pending',
    });
    if (userRequests) {
      throw new BadRequestException([
        'You have already requested for withdrawal',
      ]);
    }
    const withdrawalRequest = new this.withdrawalRequestModel({
      email,
      createdBy: userId,
      withdrawalAmount: amount,
      status: requestStatus.PENDING,
    });
    await withdrawalRequest.save();
    return withdrawalRequest;
  }

  async changeRequestStatus(id: string, body: ChangeRequestStatusDto) {
    const { status, comments } = body;
    const withdrawalRequest = await this.withdrawalRequestModel.findById(id);
    if (!withdrawalRequest) {
      throw new BadRequestException(['Withdrawal request not found']);
    }
    if (withdrawalRequest.status !== requestStatus.PENDING) {
      throw new BadRequestException(['Withdrawal request already ressolved']);
    }
    if (status === requestStatus.APPROVED) {
      const user = await this.userModel.findById(withdrawalRequest.createdBy);
      if (!user) {
        throw new BadRequestException(['User not found']);
      }
      user.referralBonus -= withdrawalRequest.withdrawalAmount;
      await user.save();
    }
    withdrawalRequest.status = status;
    withdrawalRequest.comments = comments;
    await withdrawalRequest.save();
    return withdrawalRequest;
  }

  async getUserPicturesRecords(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }

    const pictures = await this.userPictureModel
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    await Promise.all(
      pictures.map(async (record: any) => {
        const uuid = record?.picture?.uuid;
        if (uuid) {
          const profilePicLink = await this.firebaseStorageService.getSignedUrl(
            `users/${uuid}`,
          );
          if (!record.picture) {
            record.picture = {};
          }
          record.picture.link = profilePicLink;
        }
      }),
    );

    return pictures;
  }

  async updateStreak(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUserCheckInRecord: any =
      await this.userActivityRecordModel.findOne({ userId: user?._id });
    if (lastUserCheckInRecord) {
      const lastDate = new Date(lastUserCheckInRecord.lastActivityDate || 0);
      console.log(lastUserCheckInRecord.lastActivityDate,lastDate)
      lastDate.setHours(0, 0, 0, 0);
      const diff =
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        lastUserCheckInRecord.streakCount += 1;
      } else if (diff > 1) {
        lastUserCheckInRecord.streakCount = 1;
      }

      lastUserCheckInRecord.totalDaysPracticed += 1;
      lastUserCheckInRecord.lastActivityDate = new Date();
      lastUserCheckInRecord.activityHistory.push(new Date());

      await lastUserCheckInRecord.save();
    } else {
      const newRecord = new this.userActivityRecordModel({
        userId: user._id,
        streakCount: 1,
        totalDaysPracticed: 1,
        lastActivityDate: new Date(),
        activityHistory: [new Date()],
      });
      await newRecord.save();
    }
    return 'Streak updated successfully';
  }

  async getUsersActivityRecords(userId, type: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    if (type == 'all') {
      return await this.userActivityRecordModel
        .find()
        .populate({
          path: 'userId',
          select: 'name', // only include 'name' field
        })
        .sort({ streakCount: -1 })
        .limit(10);
    }
    return await this.userActivityRecordModel.findOne({ userId: user._id });
  }

  async createOpenAIResponseHistory(userId, promptType) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    let openAiResponse = {}
    if (promptType == PromptType.FACE_SCAN) {
      openAiResponse = user.appearanceJSON
    }
    if(promptType == PromptType.FITNESS_PLAN) {
      openAiResponse = user.fitnessPlanJSON
    }
    if(promptType == PromptType.NUTRITION_PLAN) {
      openAiResponse = user.nutritionPlanJSON
    }
    if(promptType == PromptType.SKIN_CARE) {
      openAiResponse = user.skinCareJSON
    }
    if(promptType == PromptType.WATER) {
      openAiResponse = user.waterJSON
    }
    if (!openAiResponse) {
      return null;
    }
    const newOpenAiResponseHistory = new this.userOpenAiRecordModel({
      userId: user._id,
      type: promptType,
      openAiResponse,
    });
    await newOpenAiResponseHistory.save();
    return newOpenAiResponseHistory;
  }

  async getOpenAiResponseHistory(userId, dto: OpenAiPromptTypeDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    const { promptType } = dto;
    const whereCondition:any = {
      userId: user._id,
    };
    if (promptType == PromptType.FACE_SCAN) {
      whereCondition.type = PromptType.FACE_SCAN;
    }
    if(promptType == PromptType.FITNESS_PLAN) {
      whereCondition.type = PromptType.FITNESS_PLAN;
    }
    if(promptType == PromptType.NUTRITION_PLAN) {
      whereCondition.type = PromptType.NUTRITION_PLAN;
    }
    if(promptType == PromptType.SKIN_CARE) {
      whereCondition.type = PromptType.SKIN_CARE;
    }
    if(promptType == PromptType.WATER) {
      whereCondition.type = PromptType.WATER;
    }
    return await this.userOpenAiRecordModel
      .find(whereCondition)
      .sort({ createdAt: -1 })
  }
}
