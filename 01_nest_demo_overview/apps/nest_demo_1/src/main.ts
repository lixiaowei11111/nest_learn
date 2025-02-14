import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './guards/auth.guard';
// import { RolesGuard } from './guards/roles.guard';
// import { LoggerMiddleware } from './middleware/logger.middleware';
// import { errorMiddleware } from './middleware/error.middleware';
// import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 
  使用全局的middleware,exception filter,guards,pipes都需要实例化,
  在Controller Scope和Method Scope上使用时,由于依赖注入(Injectable装饰器),这些中间件会自动`去实例化,所以可以直接传递class,而不需要实例化
  */
  // app.use(new LoggerMiddleware().use); //class的全局middleware 需要使用INestMiddleware上的use方法
  // app.use(errorMiddleware); // https://docs.nestjs.com/middleware#global-middleware
  // app.useGlobalFilters(new HttpExceptionFilter()); //https://docs.nestjs.com/exception-filters#binding-filters
  // app.useGlobalGuards(new AuthGuard(), new RolesGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
