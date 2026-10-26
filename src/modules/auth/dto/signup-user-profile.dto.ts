import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsFileSizeValid } from 'src/commons/dto/file-size.dto';

export class SignUpUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @Type(() => String)
  @IsString({ message: 'Age in years must be a string' })
  readonly ageInYears: string;

  @ApiProperty({ example: true })
  @IsOptional()
  // @IsBoolean({ message: 'Allow push notification must be a boolean value' })
  readonly allowPushNotification: boolean;

  @ApiProperty({ example: '5ft 10in' })
  @IsNotEmpty()
  @IsString({ message: 'Height must be a string' })
  readonly height: string;

  @ApiPropertyOptional({
    example: 'ABCD1234',
    description: 'Referral code of another user',
  })
  @IsOptional()
  @IsString({ message: 'Referral Link must be a string' })
  readonly referralLink?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile picture file to upload',
  })
  @IsNotEmpty({ message: 'Profile Picture is required' })
  @IsFileSizeValid({
    message: 'File size exceeds the maximum allowed limit of 35 MB',
  })
  readonly file: string;
}
