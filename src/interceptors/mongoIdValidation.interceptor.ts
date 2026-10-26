import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function validateMongoId(id: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

@Injectable()
export class MongoIdValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    if (!validateMongoId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return next.handle().pipe(
      map((data) => {
        // Modify the response if needed
        return data;
      }),
    );
  }
}
