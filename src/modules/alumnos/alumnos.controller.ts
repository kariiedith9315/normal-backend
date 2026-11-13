import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';
import { UpdateAlumnoDto } from './dto/update-alumno.dto.js';

@Controller('alumnos')
export class AlumnosController {
  @Post()
  create(@Body() dto: CreateAlumnoDto) {
    return dto; // por ahora devuelve lo que recibe, para probar la validación
  }

  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlumnoDto) {
    return { id, ...dto };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { id };
  }
}