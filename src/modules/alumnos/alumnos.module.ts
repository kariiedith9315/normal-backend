import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller.js';
import { AlumnosService } from './alumnos.service.js';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}