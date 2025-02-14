import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigOptions, CONFIG_OPTIONS } from './interfaces';

// 1.静态模块
// @Module({
//   controllers: [ConfigController],
//   providers: [ConfigService],
// })
// export class ConfigModule {}

//2. 动态模块
// @Module({})
// export class ConfigModule {
//   static register(options: ConfigOptions): DynamicModule {
//     return {
//       module: ConfigModule,
//       providers: [
//         {
//           provide: CONFIG_OPTIONS,
//           useValue: options,
//         },
//         ConfigService,
//       ],
//       controllers: [ConfigController],
//     };
//   }
// }

// 3. Config Module 构建器

import { ConfigurableModuleClass } from './config.module-definition';
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
