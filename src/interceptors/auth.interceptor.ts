import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DecryptTokenInterceptor implements NestInterceptor {
  private readonly secretKey = 'PakBw6WxqD'; // Replace with your own secret key

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const user = jwt.verify(token, this.secretKey);
        // Decrypt the token or perform any additional processing here
        request.user = user; // Attach the decrypted token to the request object
        return next.handle().pipe(
          map((data) => {
            return data;
          }),
        );
      } catch (error) {
        throw new UnauthorizedException(['Unauthorized']);
      }
    } else {
      throw new UnauthorizedException(['Unauthorized']);
    }
  }
}
