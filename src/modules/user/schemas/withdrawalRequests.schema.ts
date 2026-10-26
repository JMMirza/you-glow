import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { requestStatus } from 'src/commons/constants';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';

export type WithdrawalRequestDocument = HydratedDocument<WithdrawalRequest>;
@Schema()
export class WithdrawalRequest extends Base {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  withdrawalAmount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, default: requestStatus.PENDING })
  status: string;

  @Prop({ required: false   })
  comments: string;
}

export const WithdrawalRequestSchema = SchemaFactory.createForClass(WithdrawalRequest);

WithdrawalRequestSchema.add(BaseSchema);
