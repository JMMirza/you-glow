import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Matches,
  IsString,
  IsEmail,
  IsEmpty,
  IsOptional,
} from 'class-validator';

import { PASSWORD_REGEX } from 'src/commons/constants';

export class SignupDto {
  @ApiProperty({
    type: String,
    example: 'Muhammad',
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  readonly firstName: string;

  @ApiProperty({
    type: String,
    example: 'Mubeen',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  readonly lastName: string;

  @ApiProperty({
    example: 'muhammadmubeen12345@gmail.com',
    description: "User's email",
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'Abcd@123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one special character, one number, one uppercase character, and be between 8 to 16 characters',
  })
  readonly password: string;

  @ApiProperty({
    type: String,
    example: '+932 12345678',
  })
  @IsString({ message: 'Phone Number must be a string' })
  @IsOptional()
  readonly contactNumber: string;
}
