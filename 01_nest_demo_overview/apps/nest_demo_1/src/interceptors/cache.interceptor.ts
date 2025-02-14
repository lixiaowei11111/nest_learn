import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isCached = true;
    if (isCached) {
      return of({
        message: 'this is CacheInterceptor interceptor',
        data: [],
      });
    }
    return next.handle();
  }
}
