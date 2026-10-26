import { Routes } from '@nestjs/core';
import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { OpenAIModule } from '../openai';
import { ChatModule } from '../chat';

export const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/openai',
    module: OpenAIModule,
  },
  {
    path: '/chat',
    module: ChatModule,
  },
];
