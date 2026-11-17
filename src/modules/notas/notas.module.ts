import { Module } from '@nestjs/common';
import { NotasService } from './notas.service.js';
import { NotasController } from './notas.controller.js';

@Module({
  controllers: [NotasController],
  providers: [NotasService],
  exports: [NotasService],
})
export class NotasModule {}