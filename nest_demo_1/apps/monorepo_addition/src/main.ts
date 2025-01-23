import { NestFactory } from '@nestjs/core';
import { MonorepoAdditionModule } from './monorepo_addition.module';

async function bootstrap() {
  const app = await NestFactory.create(MonorepoAdditionModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
