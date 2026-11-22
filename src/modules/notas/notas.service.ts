import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateNotaDto } from './dto/create-nota.dto.js';

@Injectable()
export class NotasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.nota.findMany({
      include: {
        alumno: true,
        materia: true,
      },
    });
  }

  async findByAlumno(id_alumno: number) {
    const notas = await this.prisma.nota.findMany({
      where: { id_alumno },
      include: { materia: true },
    });

    if (notas.length === 0) {
      throw new NotFoundException(`No se encontraron notas para el alumno con ID ${id_alumno}`);
    }

    return notas;
  }

  async create(dto: CreateNotaDto) {
    const nuevaNota = await this.prisma.nota.create({
      data: dto,
    });

    return {
      message: 'Calificación registrada exitosamente',
      data: nuevaNota,
    };
  }
}