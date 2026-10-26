// create-chat.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {

  @ApiProperty({ example: 'How do I improve my focus?' })
  @IsString()
  content: string;
}
