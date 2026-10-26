import { AuthController } from 'src/modules/auth/controllers';
import { AuthService } from 'src/modules/auth/services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/schemas';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { SendGridService } from 'src/services/sendgrid.service';
import { FirebaseStorageService, OpenAIService } from 'src/services';
import { SignUpUser, SignUpUserSchema } from '../user/schemas/signupUsers.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SignUpUser.name, schema: SignUpUserSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_TOKEN_KEY'),
        signOptions: {
          expiresIn: String(configService.get('JWT_EXPIRES_IN')),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    NestjsFormDataModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseStorageService, SendGridService, OpenAIService],
  exports: [AuthService],
})
export class AuthModule {}
