import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export enum Type {
  GOOGLE = 'google',
  APPLE = 'apple',
}

export class SocialSignupDto {
  @ApiProperty({
    example: 'muhammadmubeen12345@gmail.com',
    description: "User's email",
  })
  @IsOptional()
  // @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'XXXXXXXXXXXXXXXX',
  })
  @IsString({ message: 'Social Id must be a string' })
  @IsNotEmpty({ message: 'Social Id is required' })
  readonly socialId: string;

  @ApiProperty({
    type: String,
    example: '683f3492bc696f3687325a77',
  })
  @IsString({ message: 'Signup user Id must be a string' })
  @IsOptional()
  readonly signupUserId: string;

  @ApiProperty({ example: 'google', enum: Type })
  @IsEnum(Type, { message: 'Invalid login type(google,apple)' })
  readonly socialType: Type;
}
