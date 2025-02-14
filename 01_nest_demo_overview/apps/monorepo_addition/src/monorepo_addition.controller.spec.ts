import { Test, TestingModule } from '@nestjs/testing';
import { MonorepoAdditionController } from './monorepo_addition.controller';
import { MonorepoAdditionService } from './monorepo_addition.service';

describe('MonorepoAdditionController', () => {
  let monorepoAdditionController: MonorepoAdditionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MonorepoAdditionController],
      providers: [MonorepoAdditionService],
    }).compile();

    monorepoAdditionController = app.get<MonorepoAdditionController>(MonorepoAdditionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(monorepoAdditionController.getHello()).toBe('Hello World!');
    });
  });
});
