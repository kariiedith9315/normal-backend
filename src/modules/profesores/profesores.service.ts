import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';
import { UpdateProfesorDto } from './dto/update-profesor.dto.js';

@Injectable()
export class ProfesoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profesor.findMany({
      include: { materias: true },
    });
  }

  async findOne(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id_profesor: id },
      include: { materias: true },
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }

    return profesor;
  }

  async create(dto: CreateProfesorDto) {
    const existe = await this.prisma.profesor.findFirst({
      where: {
        OR: [{ dni: dto.dni }, { email: dto.email }],
      },
    });

    if (existe) {
      throw new ConflictException('Ya existe un profesor registrado con ese DNI o email');
    }

    const nuevoProfesor = await this.prisma.profesor.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        dni: dto.dni,
        email: dto.email,
        telefono: dto.telefono ?? '',
        especialidad: dto.especialidad,
        direccion: dto.direccion ?? '',
        ...(dto.fecha_ingreso && { fecha_ingreso: new Date(dto.fecha_ingreso) }),
      },
    });

    return {
      message: 'Profesor creado exitosamente',
      data: nuevoProfesor,
    };
  }

  async update(id: number, dto: UpdateProfesorDto) {
    await this.findOne(id);

    const { fecha_ingreso, ...restoDto } = dto;

    const actualizado = await this.prisma.profesor.update({
      where: { id_profesor: id },
      data: {
        ...restoDto,
        ...(fecha_ingreso && { fecha_ingreso: new Date(fecha_ingreso) }),
      },
    });

    return {
      message: 'Profesor actualizado exitosamente',
      data: actualizado,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    const eliminado = await this.prisma.profesor.delete({
      where: { id_profesor: id },
    });

    return {
      message: 'Profesor eliminado exitosamente',
      data: eliminado,
    };
  }
}