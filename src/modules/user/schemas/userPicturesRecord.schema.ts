import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';
export type UserPictureRecordDocument = HydratedDocument<UserPictureRecord>;

@Schema()
export class UserPictureRecord extends Base {
  @Prop({
    type: {},
    required: false,
    default: null,
  })
  picture: {};

  @Prop({ required: false, default: '' })
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}

export const UserPictureRecordSchema =
  SchemaFactory.createForClass(UserPictureRecord);

// Extend with BaseSchema for common fields
UserPictureRecordSchema.add(BaseSchema);
