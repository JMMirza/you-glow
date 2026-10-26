import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  statusCheck(): string {
    return 'pong';
  }
}
