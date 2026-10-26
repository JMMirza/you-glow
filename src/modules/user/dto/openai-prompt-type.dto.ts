// store-openai.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PromptType } from 'src/modules/openai/dto';

export class OpenAiPromptTypeDto {
  @ApiProperty({
    enum: PromptType,
    description: 'The type of prompt to process',
  })
  @IsEnum(PromptType)
  @IsNotEmpty()
  promptType: PromptType;
}
