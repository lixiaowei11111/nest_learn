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
// import { HttpExceptionFilter } from './filter/http-exception.filter';
// import { APP_FILTER } from '@nestjs/core';
import { PandaModule } from './panda/panda.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './guards/roles.guard';
import { FishModule } from './fish/fish.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [CatsModule, DogsModule, PandaModule, FishModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 任何从模块外部注册的ExceptionFilter,Guards都不能享受到模块的依赖注入
    /* 
    https://docs.nestjs.com/guards#role-based-authentication
    global guards在整个应用程序中使用，用于每个controller和每个route处理程序。
    如果需要controller能够享受到依赖注入的话，从任何模块外部注册的全局守卫（如上例中的 useGlobalGuards()）不能注入依赖项，因为这是在任何模块的上下文之外完成的。为解决此问题，您可以使用以下结构直接从任何模块设置守卫：
    */
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
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
