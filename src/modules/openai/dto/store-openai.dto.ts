// store-openai.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PromptType } from './prompt-type.enum';

export class StoreOpenAiDto {
  @ApiProperty({
    enum: PromptType,
    description: 'The type of prompt to process',
    example: `Use any of them at one time [${PromptType.SKIN_CARE}, ${PromptType.NUTRITION_PLAN}, ${PromptType.FITNESS_PLAN}, ${PromptType.WATER}]`,
  })
  @IsEnum(PromptType)
  @IsNotEmpty()
  promptType: PromptType;
}
