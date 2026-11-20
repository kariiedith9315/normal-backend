import { Body, Controller, Post } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto.js';

@Controller('direccion')
export class DireccionController {
  @Post()
  create(@Body() createDireccionDto: CreateDireccionDto) {
    return createDireccionDto;
  }
}
