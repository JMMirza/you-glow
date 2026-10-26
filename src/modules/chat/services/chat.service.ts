import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from 'src/services';
import { CreateChatDto } from '../dto';
import { Chat } from '../schemas';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private readonly openAiAPI: OpenAIService,
  ) {}

  // chat.service.ts
  async create(userId, dto: CreateChatDto) {
    const { content } = dto;

    // find or create chat document for user
    let chat = await this.chatModel.findOne({ userId });

    if (!chat) {
      chat = await this.chatModel.create({
        userId,
        messages: [],
      });
    }

    // push user message
    chat.messages.push({ role: 'user', content });

    // get assistant reply
    const assistantReply = await this.openAiAPI.generateText(content);

    // push assistant reply
    chat.messages.push({ role: 'assistant', content: assistantReply });

    await chat.save();
    return chat;
  }

  async findByUser(userId: string) {
    return this.chatModel.findOne({ userId });
  }

  async report(id: string) {
    return this.chatModel.findByIdAndUpdate(
      id,
      { report: true },
      { new: true },
    );
  }
}
