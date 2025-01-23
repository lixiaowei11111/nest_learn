import { Module } from '@nestjs/common';
import { MonorepoAdditionController } from './monorepo_addition.controller';
import { MonorepoAdditionService } from './monorepo_addition.service';

@Module({
  imports: [],
  controllers: [MonorepoAdditionController],
  providers: [MonorepoAdditionService],
})
export class MonorepoAdditionModule {}
