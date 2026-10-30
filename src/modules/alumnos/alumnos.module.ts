import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller.js';

@Module({
  controllers: [AlumnosController]
})
export class AlumnosModule {}
