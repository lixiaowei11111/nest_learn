import { Module } from '@nestjs/common';
import { PandaService } from './panda.service';
import { PandaController } from './panda.controller';

@Module({
  controllers: [PandaController],
  providers: [PandaService],
})
export class PandaModule {}
