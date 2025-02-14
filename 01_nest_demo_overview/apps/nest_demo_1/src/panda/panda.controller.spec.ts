import { Test, TestingModule } from '@nestjs/testing';
import { PandaController } from './panda.controller';
import { PandaService } from './panda.service';

describe('PandaController', () => {
  let controller: PandaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PandaController],
      providers: [PandaService],
    }).compile();

    controller = module.get<PandaController>(PandaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
