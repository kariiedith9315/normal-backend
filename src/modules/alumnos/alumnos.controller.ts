import { Body, Controller, Post } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';

@Controller('alumnos')
export class AlumnosController {
  @Post()
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return createAlumnoDto;
  }
}
