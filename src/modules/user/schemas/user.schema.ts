import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  HydratedDocument,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Base {
  @Prop({ required: false, default: [] })
  fcmTokens: string[];

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  dob: Date;

  @Prop({ required: false, default: '' })
  ageInYears: string;

  @Prop({ required: false, default: [] })
  goals: string[];

  @Prop({ required: false, default: false })
  workingOut: boolean;

  @Prop({ required: false, default: '' })
  height: string;

  @Prop({ required: false, default: '' })
  weight: string;

  @Prop({ required: false, default: '' })
  desireWeight: string;

  @Prop({ required: false, default: '' })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: false })
  socialId: string;

  @Prop({ required: false })
  socialType: string;

  @Prop({
    type: {},
    required: false,
    default: null,
  })
  profilePicture: {};

  @Prop({
    type: {},
    required: false,
    default: null,
  })
  bodyScan: {};

  @Prop({
    type: {},
    required: false,
    default: null,
  })
  oldBodyScan: {};

  @Prop({ required: false, default: [] })
  pictures: object[];

  @Prop({ required: false, default: false })
  isDeleted: boolean;

  @Prop({ required: false, default: false })
  isPremium: boolean;

  @Prop({
    type: Date,
    required: false,
  })
  premiumExpiry: Date;

  @Prop({ required: false, default: false })
  profileSetup: boolean;

  @Prop({ required: false, default: false })
  allowPushNotification: boolean;

  @Prop({ type: String, required: true, unique: true })
  referralLink: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  referredBy: Types.ObjectId;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ])
  referredUsers: User[];

  @Prop({ required: false, default: 0 })
  referralBonus: number;

  @Prop({ type: Date, default: Date.now })
  lastSeen: Date;

  @Prop({ type: MongooseSchema.Types.Mixed })
  appearanceJSON: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  skinCareJSON: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  nutritionPlanJSON: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  fitnessPlanJSON: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  waterJSON: Record<string, any>;

  @Prop({ required: false, default: 0 })
  prevOverallRating: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Extend with BaseSchema for common fields
UserSchema.add(BaseSchema);
