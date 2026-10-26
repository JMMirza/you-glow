import { Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignupDto, SignUpUserDto } from 'src/modules/auth/dto';
import { AuthService } from 'src/modules/auth/services';
import { Body, Post } from '@nestjs/common';
import { SocialSignupDto } from '../dto/socialSignUp.dto';
import { FormDataRequest } from 'nestjs-form-data';
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('seed-admin')
  @ApiExcludeEndpoint() // This specific endpoint will be hidden in Swagger
  async seedAdmin(@Body() signupDto: SignupDto) {
    return await this.authService.seedUser(signupDto);
  }

  @Post('social-login')
  async socialLogin(@Body() body: SocialSignupDto): Promise<any> {
    const userSignup = await this.authService.socialLogin(body);
    return userSignup;
  }

  @FormDataRequest()
  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'The API that creates/updates user profile' })
  @ApiResponse({
    status: 201,
    description: 'User profile created successfully.',
  })
  async create(@Body() userProfileDto: SignUpUserDto) {
    return this.authService.create(userProfileDto);
  }
}
