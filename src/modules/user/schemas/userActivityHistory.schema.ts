import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';
export type UserActivityHistoryDocument = HydratedDocument<UserActivityHistory>;

@Schema()
export class UserActivityHistory extends Base {
  @Prop({ default: 1 })
  streakCount: number;

  @Prop({ default: 0 })
  totalDaysPracticed: number;

  @Prop()
  lastActivityDate: Date;

  @Prop({ type: [Date], default: [] })
  activityHistory: Date[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}

export const UserActivityHistorySchema =
  SchemaFactory.createForClass(UserActivityHistory);

// Extend with BaseSchema for common fields
UserActivityHistorySchema.add(BaseSchema);
