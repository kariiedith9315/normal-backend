import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';

@Controller('profesores')
export class ProfesoresController {
  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return createProfesorDto;
  }
}
