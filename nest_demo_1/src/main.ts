import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware); // https://docs.nestjs.com/middleware#global-middleware
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
