import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service.js';
import { AsistenciasController } from './asistencias.controller.js';

@Module({
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
  exports: [AsistenciasService],
})
export class AsistenciasModule {}