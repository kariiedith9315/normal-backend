import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlumnosModule } from '../../modules/alumnos/alumnos.module.js';
import { ProfesoresModule } from '../../modules/profesores/profesores.module.js';
import { DireccionModule } from '../../modules/direccion/direccion.module.js';

@Module({
  imports: [AlumnosModule, ProfesoresModule, DireccionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}