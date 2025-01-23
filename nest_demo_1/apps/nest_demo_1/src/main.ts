import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use); //class的全局middleware 需要使用INestMiddleware上的use方法
  app.use(errorMiddleware); // https://docs.nestjs.com/middleware#global-middleware
  app.useGlobalFilters(new HttpExceptionFilter()); //https://docs.nestjs.com/exception-filters#binding-filters
  const metaData = Reflect.getMetadata(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
