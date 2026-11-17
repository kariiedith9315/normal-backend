import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NotasService } from './notas.service.js';
import { CreateNotaDto } from './dto/create-nota.dto.js';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get()
  findAll() {
    return this.notasService.findAll();
  }

  @Get('alumno/:id')
  findByAlumno(@Param('id', ParseIntPipe) id: number) {
    return this.notasService.findByAlumno(id);
  }

  @Post()
  create(@Body() createNotaDto: CreateNotaDto) {
    return this.notasService.create(createNotaDto);
  }
}