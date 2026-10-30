import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service.js';

@Module({
  providers: [AlumnosService]
})
export class AlumnosModule {}
