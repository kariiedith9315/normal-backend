import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlumnosModule } from '../alumnos/alumnos.module.js'; 

@Module({
  imports: [AlumnosModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}