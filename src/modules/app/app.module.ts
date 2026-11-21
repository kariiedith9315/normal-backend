import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AlumnosModule } from '../alumnos/alumnos.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { ProfesoresModule } from '../profesores/profesores.module.js';
import { UsersModule } from '../users/users.module.js';
import { NotasModule } from '../notas/notas.module.js';
import { AsistenciasModule } from '../asistencias/asistencias.module.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    AlumnosModule,
    AuthModule,
    ProfesoresModule,
    UsersModule,
    NotasModule,
    AsistenciasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}