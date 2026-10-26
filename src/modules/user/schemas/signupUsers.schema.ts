import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';
export type SignUpUserDocument = HydratedDocument<SignUpUser>;

@Schema()
export class SignUpUser extends Base {
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

  @Prop({
    type: {},
    required: false,
    default: null,
  })
  profilePicture: {};

  @Prop({ required: false, default: false })
  isUsed: boolean;

  @Prop({ required: false, default: false })
  allowPushNotification: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  referredBy: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  appearanceJSON: Record<string, any>;
}

export const SignUpUserSchema = SchemaFactory.createForClass(SignUpUser);

// Extend with BaseSchema for common fields
SignUpUserSchema.add(BaseSchema);
