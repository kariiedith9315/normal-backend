import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';
import { UpdateAlumnoDto } from './dto/update-alumno.dto.js';

@Injectable()
export class AlumnosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.alumno.findMany({
      include: {
        tutor: true,
        notas: true,
        asistencias: true,
      },
    });
  }

  async findOne(id: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id_alumno: id },
      include: {
        tutor: true,
        notas: { include: { materia: true } },
        asistencias: { include: { materia: true } },
      },
    });

    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }

    return alumno;
  }

  async create(dto: CreateAlumnoDto) {
    const existeDni = await this.prisma.alumno.findUnique({
      where: { dni: dto.dni },
    });

    if (existeDni) {
      throw new ConflictException(`Ya existe un alumno registrado con el DNI ${dto.dni}`);
    }

    if (dto.id_tutor) {
      const tutor = await this.prisma.tutor.findUnique({
        where: { id_tutor: dto.id_tutor },
      });
      if (!tutor) {
        throw new NotFoundException(`Tutor con ID ${dto.id_tutor} no encontrado`);
      }
    }

    const nuevoAlumno = await this.prisma.alumno.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        dni: dto.dni,
        fecha_nacimiento: dto.fecha_nacimiento,
        telefono: dto.telefono,
        ...(dto.id_tutor && { id_tutor: dto.id_tutor }),
      },
    });

    return {
      message: 'Alumno creado exitosamente',
      data: nuevoAlumno,
    };
  }

  async update(id: number, dto: UpdateAlumnoDto) {
    await this.findOne(id);

    if (dto.id_tutor) {
      const tutor = await this.prisma.tutor.findUnique({
        where: { id_tutor: dto.id_tutor },
      });
      if (!tutor) {
        throw new NotFoundException(`Tutor con ID ${dto.id_tutor} no encontrado`);
      }
    }

    const actualizado = await this.prisma.alumno.update({
      where: { id_alumno: id },
      data: dto,
    });

    return {
      message: 'Alumno actualizado exitosamente',
      data: actualizado,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    const eliminado = await this.prisma.alumno.delete({
      where: { id_alumno: id },
    });

    return {
      message: 'Alumno eliminado exitosamente',
      data: eliminado,
    };
  }
}