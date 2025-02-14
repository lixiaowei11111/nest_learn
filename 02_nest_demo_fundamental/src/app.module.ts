import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

/* 
* Dynamic Module只是在运行时创建的模块，具有与静态模块完全相同的属性，再加上一个名为module的额外属性。
* Static Module是通过在Nest中使用@Module()装饰器创建的模块。通常只有imports,exports,controllers,providers等属性
!动态模块必须返回一个具有完全相同接口的对象，另外还要添加一个名为 module 的属性。module 属性作为模块的名称，并且应该与模块的类名相同


*/

@Module({
  imports: [
    CatModule,
    UserModule,
    AuthModule,
    // ConfigModule.register({ folder: './config' }),
    ConfigModule.forRoot({ folder: './config' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
