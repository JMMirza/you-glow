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

export class UserProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date of birth must be a valid date' })
  readonly dob: Date;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @Type(() => String)
  @IsString({ message: 'Age in years must be a string' })
  readonly ageInYears: string;

  @ApiProperty({ example: ['Lose Weight', 'Build Muscle'] })
  @IsOptional()
  @IsArray({ message: 'Goals must be an array of strings' })
  @IsString({ each: true, message: 'Each goal must be a string' })
  readonly goals: string[];

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'WorkingOut must be a boolean value' })
  readonly workingOut: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'Allow push notification must be a boolean value' })
  readonly allowPushNotification: boolean;

  @ApiProperty({ example: '5ft 10in' })
  @IsNotEmpty()
  @IsString({ message: 'Height must be a string' })
  readonly height: string;

  @ApiProperty({ example: '160 lbs' })
  @IsOptional()
  @IsString({ message: 'Weight must be a string' })
  readonly weight: string;

  @ApiProperty({ example: '140 lbs' })
  @IsOptional()
  @IsString({ message: 'Desired Weight must be a string' })
  readonly desireWeight: string;

  @ApiPropertyOptional({
    example: 'ABCD1234',
    description: 'Referral code of another user',
  })
  @IsOptional()
  @IsString({ message: 'Referral Link must be a string' })
  readonly referralLink?: string;

  @ApiPropertyOptional({
    example: 'fcm_token',
    description: 'FCM token for push notification',
  })
  @IsOptional()
  @IsString({ message: 'FCM token must be a string' })
  readonly fcmToken?: string;
}
