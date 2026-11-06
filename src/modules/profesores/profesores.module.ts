import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller.js';

@Module({
  controllers: [ProfesoresController]
})
export class ProfesoresModule {}
