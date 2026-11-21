import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto.js';

@Injectable()
export class AsistenciasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.asistencia.findMany({
      include: {
        alumno: true,
        materia: true,
      },
    });
  }

  async findByAlumno(id_alumno: number) {
    const resultado = await this.prisma.asistencia.findMany({
      where: { id_alumno },
      include: { materia: true },
    });

    if (resultado.length === 0) {
      throw new NotFoundException(
        `No se encontraron registros de asistencia para el alumno con ID ${id_alumno}`,
      );
    }

    return resultado;
  }

  async create(dto: CreateAsistenciaDto) {
    const nuevaAsistencia = await this.prisma.asistencia.create({
      data: {
        id_alumno: dto.id_alumno,
        id_materia: dto.id_materia,
        fecha: dto.fecha,
        estado: dto.estado,
      },
    });

    return {
      message: 'Asistencia registrada exitosamente',
      data: nuevaAsistencia,
    };
  }
}