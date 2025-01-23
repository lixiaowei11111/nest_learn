import { Controller, Get } from '@nestjs/common';
import { MonorepoAdditionService } from './monorepo_addition.service';

@Controller()
export class MonorepoAdditionController {
  constructor(private readonly monorepoAdditionService: MonorepoAdditionService) {}

  @Get()
  getHello(): string {
    return this.monorepoAdditionService.getHello();
  }
}
