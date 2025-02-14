import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from './interfaces/config-module-options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  // new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
  new ConfigurableModuleBuilder<ConfigModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

/* 
!!! Config Module 构建器
* 手动创建高度可配置的动态模块，公开异步方法（registerAsync、forRootAsync等）相当复杂，特别是对于新手而言。Nest暴露了ConfigurableModuleBuilder类，以简化此过程并让您仅需几行代码就能构建一个模块“蓝图”。  

2. 自定义方法名称
ConfigurableModuleClass默认只提供了register和registerAsync两个方法,要使用不同的方法名，请使用ConfigurableModuleBuilder＃setClassMethodName方法


*/
