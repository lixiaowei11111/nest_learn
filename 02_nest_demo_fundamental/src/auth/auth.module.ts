import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

/* 
1. 静态模块绑定
!!! Nest通过以下方式在AuthModule中使UsersService可用
实例化UsersModule，包括传递导入UsersModule本身消耗的其他模块，并传递解析任何依赖项（请参见自定义提供程序）。
实例化AuthModule，并使UsersModule的导出提供程序在AuthModule中的组件中可用（就像它们已在AuthModule中声明一样）。
在AuthService中注入UsersService的实例。

2. 动态模块
Dynamic Modules就是一个含有register/forRoot方法(也可以自定义一个方法名,通常叫做register/forRoot)的模块，可以通过传入参数来创建动态模块。
该register/forRoot方法必须返回一个Dynamic Module，该模块具有与静态模块完全相同的属性，再加上一个名为module的额外属性。
*/

@Module({
  imports: [UserModule], //静态模块绑定
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
