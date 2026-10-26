import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/schemas';
import { UserModule } from '../user';
import { FirebaseStorageService, OpenAIService } from 'src/services';
import { OpenAiService } from './services';
import { OpenAiController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [OpenAiController],
  providers: [OpenAIService, FirebaseStorageService, OpenAiService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
