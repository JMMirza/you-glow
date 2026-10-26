import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({
    example: 100,
    description: 'Amount must be a number and at least 10',
    minimum: 10,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(10, { message: 'Amount must be at least 10' })
  readonly amount: number;

  @ApiProperty({
    example: 'janmuhammadmirza@gmail.com',
    description: "User's email",
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;
}
