import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CheckUUIDDto {
  @ApiProperty({
    type: String,
    example: '3d5a6635-33e1-4b4a-ad14-f1b6af1d6a8d', // Example UUID
    description: 'UUID of the category',
  })
  @IsUUID('4', { message: 'Invalid UUID format' })
  readonly id: string;
}
