import { Test, TestingModule } from '@nestjs/testing';
import { ProfesoresController } from './profesores.controller.js';

describe('ProfesoresController', () => {
  let controller: ProfesoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesoresController],
    }).compile();

    controller = module.get<ProfesoresController>(ProfesoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
