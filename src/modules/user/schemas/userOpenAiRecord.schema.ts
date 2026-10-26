import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';
export type UserOpenAiRecordDocument = HydratedDocument<UserOpenAiRecord>;

@Schema()
export class UserOpenAiRecord extends Base {
  @Prop({
    type: {},
    required: false,
    default: null,
  })
  openAiResponse: {};

  @Prop({ required: false, default: '' })
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}

export const UserOpenAiRecordSchema =
  SchemaFactory.createForClass(UserOpenAiRecord);

// Extend with BaseSchema for common fields
UserOpenAiRecordSchema.add(BaseSchema);
