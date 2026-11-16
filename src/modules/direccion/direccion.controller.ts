import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto.js';
import { UpdateDireccionDto } from './dto/update-direccion.dto.js';


@Controller('direccion')
export class DireccionController {
  @Post()
  create(@Body() dto: CreateDireccionDto) {
    return dto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDireccionDto) {
    return { id, ...dto };
  }
}