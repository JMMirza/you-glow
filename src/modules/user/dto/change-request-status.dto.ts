import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { requestStatus } from 'src/commons/constants';

export class ChangeRequestStatusDto {
  @ApiProperty({
    example: requestStatus.PENDING,
    enum: Object.values(requestStatus),
    description: 'The status of the request',
  })
  @IsNotEmpty()
  @IsEnum(requestStatus, {
    message: 'Status must be one of: pending, approved, rejected',
  })
  readonly status: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  readonly comments: string;
}
