import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Base, BaseSchema } from 'src/commons/schemas/abstract.schema';

export type ChatDocument = HydratedDocument<Chat>;

class ChatMessage {
  @Prop({ enum: ['user', 'assistant'], required: true })
  role: 'user' | 'assistant';

  @Prop({ required: true })
  content: string;
}

@Schema()
export class Chat extends Base {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: [ChatMessage], default: [] })
  messages: ChatMessage[];

  @Prop({ default: false })
  report: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
ChatSchema.add(BaseSchema);
