import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { errorMiddleware } from './middleware/error.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { PipesModule } from './pipes/pipes.module';

@Module({
  imports: [CatsModule, DogsModule, PipesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, errorMiddleware)
      // .forRoutes({ path: 'c*ts', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}
