import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsFileSizeValid } from 'src/commons/dto/file-size.dto';

export class UpdateProfilePictureDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile picture file to upload (max 35 MB)',
    required: false,
  })
  @IsOptional()
  @IsFileSizeValid({
    message: 'File size exceeds the maximum allowed limit of 35 MB',
  })
  readonly file?: string;

  @ApiProperty({
    type: Array,
    format: 'binary',
    description: 'Array of attachment files to upload (max 35 MB each)',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsFileSizeValid({
    message: 'File size exceeds the maximum allowed limit of 35 MB',
  })
  readonly attachments?: string[];

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'Array of UUIDs to remove',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeUuids?: string[];
}