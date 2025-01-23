import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  ForbiddenException,
} from '@nestjs/common';

import { Response, Request } from 'express';

@Catch(HttpException, ForbiddenException) // Catch函数不带参数捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
