import { Injectable, Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

// useValue可用于测试
// const mockCatService = {
//   findOne: jest.fn().mockResolvedValue({ id: 1 }),
// };

// const connection = () => {};

// export const enum DB_ACTION {
//   CONNECTION = 'CONNECTION',
//   START = 'START',
//   CLOSE = 'CLOSE',
// }

// const configServiceProvider = {
//   provide: ConfigService,
//   useClass:
//     process.env.NODE_ENV === 'development'
//       ? (DevelopmentConfigService as unknown)
//       : (ProductionConfigService as unknown),
// };

// // 6. useFacotry 工厂provider inject和useFactory函数的关系
// const connectionProvider = {
//   provide: 'CONNECTION',
//   // useFactory函数的形参必须与inject的实例匹配（编译时/运行时检查）
//   useFactory: (
//     optionsProvider: MyOptionsProvider,
//     optionalProvider?: string,
//   ) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   //Nest 会先解析 inject 数组中的所有依赖项，无论是否可选
//   // inject数组元素按索引位置映射到useFactory参数
//   //Nest 会先实例化inject数组中的所有依赖项，再执行工厂函数
//   inject: [
//     MyOptionsProvider, //This provider is mandatory.这个 mandatory强制的指的是必须在providers数组中注册,即providers数组必须有MyOptionsProvoiderzh这个
//     { token: 'SomeOptionalProvider', optional: true }, //The provider with this token can resolve to `undefined`.// 这个optional:true意为可选
//   ],
// };

// 7. useExisting 创建别名provider

// @Injectable()
// class LoggerService {}

// const loggerAliasProvider = {
//   provide: 'AliasedLoggerService',
//   useExisting: LoggerService,
// };

/* 
!!! NetsJs中的IOC发生了什么
1. 在 cat.service.ts 中，@Injectable() 装饰器声明 CatService 类作为一个可以被Nest IoC容器管理的类。
2. 在 cat.controller.ts 中，CatController使用构造函数注入声明对CatService token的依赖。
3. 在 cat.module.ts中，我们将token CatService与cat.service.ts文件中的类CatService关联。
4. 当Nest IoC容器实例化一个CatsController时，它首先查找任何依赖项*。当它找到CatsService依赖项时，它会在CatsService令牌上执行查找，该令牌将返回CatsService类，根据注册步骤（上面的步骤＃3）。假设是单例作用域（默认行为），Nest将创建一个CatsService实例，将其缓存并返回，或者如果已经缓存了一个，则返回现有实例。

* 这种解释有点简化来阐明重点。我们忽略了一个重要领域，即分析代码依赖关系的过程非常复杂，并且发生在应用启动时。一个关键特性是依赖分析（或者称为“创建依赖图”）是传递的。在上面的例子中，如果CatsService本身有依赖关系，那么这些依赖关系也会被解析。依赖图确保依赖关系按正确的顺序解析 - 本质上是“自下而上”。这种机制使开发人员免于管理如此复杂的依赖关系图。
*/

// 8. 提供非Service的Provider provider可能根据当前环境提供一系列配置对象
const devConfig = {};
const prodConfig = {};
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
  },
};

// 9.异步provider:有时候，应用程序启动应该推迟，直到一个或多个异步任务完成。例如，您可能不希望在与数据库的连接建立之前开始接受请求。

const asyncFactory = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
};

@Module({
  controllers: [CatController],
  // 1. provider简写写法
  // providers: [CatService],

  // 2. providers标准写法
  // providers: [
  //   {
  //     provide: CatService,
  //     useClass: CatService,
  //   },
  // ],

  // 3. useValue属性用于 注入常量值、将外部库放入 Nest 容器或用模拟对象替换真实实现
  // providers: [
  //   {
  //     provide: CatService,
  //     useValue: mockCatService, // 模拟测试对象
  //   },
  // ],

  //4. 可使用 字符串,Symbol或者Typescript的Enum作为provide的token
  // providers: [
  //   {
  //     // provide: 'CONNECTION',
  //     provide: DB_ACTION.CONNECTION,
  //     // provide: Symbol.for('CONNECTION'),
  //     useValue: {},
  //   },
  // ],

  // 5. 动态配置注入,如根据env的不同注入不同的配置
  // providers: [configServiceProvider],

  //6. useFacotry 工厂
  // providers: [
  //   connectionProvider,
  //   MyOptionsProvider, // class-based provider
  //   // { provide: 'SomeOptionalProvider', useValue: 'anything' },//声明了Optional:true,可有可无
  // ],

  // 7. useExisting;创建别名provider
  // providers: [LoggerService, loggerAliasProvider],

  // 8.非Service的Provider provider通常提供Service，但并非仅限于此用途。provider可以提供任意值。例如，provider可以根据当前环境提供一系列配置对象
  providers: [configFactory, asyncFactory],

  // 9. 导出自定义provider, 与任何provider一样，custom provider的范围限定于其声明module。要使其对其他module可见，必须将其导出。要导出custom provider，我们可以使用其token或完整provider对象。
  // exports: [configFactory], //使用完整的provider对象,
  exports: ['CONFIG'], //使用token属性
})
export class CatModule {}
