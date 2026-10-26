import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  MethodNotAllowedException,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  timestamp: Date;
  success: boolean;
  data: T;
  error: {
    message: string | string[];
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseTemplate = {
      timestamp: new Date(),
      success: false,
      data: null,
      error: null,
    };

    return next
      .handle()
      .pipe(
        map((data) => ({
          ...responseTemplate,
          success: true,
          data,
          error: { message: [] },
        })),
      )
      .pipe(
        catchError(async (error) => {
          const response = {
            ...responseTemplate,
            success: false,
            error: {
              message: error.response?.message || error.toString(),
            },
          };

          switch (error.status) {
            case 400:
              throw new BadRequestException(response);
            case 401:
              throw new UnauthorizedException(response);
            case 403:
              throw new ForbiddenException(response);
            case 404:
              throw new NotFoundException(response);
            case 405:
              throw new MethodNotAllowedException(response);
            case 409:
              throw new ConflictException(response);
            default:
              throw error;
          }
        }),
      );
  }
}
