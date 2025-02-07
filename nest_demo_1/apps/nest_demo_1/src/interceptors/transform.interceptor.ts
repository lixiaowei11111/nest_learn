import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<K>
  implements NestInterceptor<K, Response<K>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<K>> {
    return next.handle().pipe(
      map((data) => ({
        message: 'this is TransformInterceptor interceptor',
        data,
      })),
    );
  }
}
