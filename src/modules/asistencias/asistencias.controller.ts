import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service.js';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto.js';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Get()
  findAll() {
    return this.asistenciasService.findAll();
  }

  @Get('alumno/:id')
  findByAlumno(@Param('id', ParseIntPipe) id: number) {
    return this.asistenciasService.findByAlumno(id);
  }

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciasService.create(createAsistenciaDto);
  }
}