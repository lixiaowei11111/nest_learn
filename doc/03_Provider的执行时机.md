## 1. useFactory的custom provider是在什么是否被执行的?
1. 应用启动时（当被标记为 @Global() 或根模块直接依赖时）
2. 模块初始化时（当被其他 Provider 显式依赖时）
3. 控制器/解析器处理请求时（请求作用域模式下）
4. 惰性加载模块首次被访问时


## 2. 动态模块
Dynamic Modules就是一个含有register/forRoot方法(也可以自定义一个方法名,通常叫做register/forRoot)的模块，可以通过传入参数来创建动态模块。
该register/forRoot方法必须返回一个Dynamic Module，该模块具有与静态模块完全相同的属性，再加上一个名为module的额外属性。

### [nestjs期望遵守的规范](https://docs.nestjs.com/fundamentals/dynamic-modules#community-guidelines)
+ register: 您期望为仅由调用模块使用的特定配置配置动态模块。例如，使用 Nest 的 @nestjs/axios：HttpModule.register({ baseUrl: 'someUrl' }). 如果在另一个模块中使用 HttpModule.register({ baseUrl: 'somewhere else' }), 它将具有不同的配置。您可以为尽可能多的模块执行此操作。

+ forRoot: 您期望配置动态模块一次，并在多个地方重用该配置（尽管可能不知情，因为它被抽象化）。这就是为什么您会有一个 GraphQLModule.forRoot()，一个 TypeOrmModule.forRoot() 等。

+ forFeature: 您期望使用动态模块的 forRoot 配置，但需要修改一些针对调用模块需求的特定配置（即，这个模块应该访问哪个存储库，或者一个日志记录器应该使用的上下文）。

> 手动创建高度可配置的动态模块，公开异步方法（registerAsync、forRootAsync等）相当复杂，特别是对于新手而言。Nest暴露了**ConfigurableModuleBuilder**类，以简化此过程并让您仅需几行代码就能构建一个模块“蓝图”。


```ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      controllers: [ConfigController],
    };
  }
}
```