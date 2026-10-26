import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AuthModuleOptions } from '@nestjs/passport';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/config';
import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenAIModule } from '../openai';
import { ChatModule } from '../chat';

@Module({
  imports: [
    MongooseModule.forRoot(config.DATABASE_LINK, {
      dbName: config.DATABASE_NAME,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    OpenAIModule,
    ChatModule,
    RouterModule.register(routes),
    ConfigModule.forRoot({ isGlobal: true }),
    MorganModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    AuthModuleOptions,
  ],
})
export class AppModule {
  static port: number;
  static hostname: string;
  static isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = Number(process.env.PORT);
    AppModule.hostname = this.configService.get('APP_URL');
    AppModule.isProduction =
      this.configService.get('NODE_ENV') === 'production';
  }
}
