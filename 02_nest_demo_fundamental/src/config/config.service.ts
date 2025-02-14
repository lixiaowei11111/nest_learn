import { Inject, Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { EnvConfig, ConfigOptions, CONFIG_OPTIONS } from './interfaces';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { ConfigModuleOptions } from './interfaces/config-module-options';

@Injectable()
export class ConfigService {
  constructor(
    private readonly envConfig: EnvConfig,
    // @Inject(CONFIG_OPTIONS) private config: ConfigOptions,
    @Inject(MODULE_OPTIONS_TOKEN) private config: ConfigModuleOptions,
  ) {
    const options = { folder: './config' };

    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  create(createConfigDto: CreateConfigDto) {
    return 'This action adds a new config';
  }

  findAll() {
    return `This action returns all config`;
  }

  findOne(id: number) {
    return `This action returns a #${id} config`;
  }

  update(id: number, updateConfigDto: UpdateConfigDto) {
    return `This action updates a #${id} config`;
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }
}
