import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';
import { UpdateProfesorDto } from './dto/update-profesor.dto.js';

@Controller('profesores')
export class ProfesoresController {
  @Post()
  create(@Body() dto: CreateProfesorDto) {
    return dto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfesorDto) {
    return { id, ...dto };
  }
}