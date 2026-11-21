import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_usuario: id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const existeEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existeEmail) {
      throw new ConflictException(`El email ${dto.email} ya está registrado`);
    }

    const nuevoUsuario = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        rol: dto.rol as string,
        activo: true,
      },
    });

    return {
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario,
    };
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id); // Verifica que exista; si no, lanza NotFoundException

    const usuarioActualizado = await this.prisma.user.update({
      where: { id_usuario: id },
      data: {
        ...(dto.email && { email: dto.email }),
        ...(dto.password && { password: dto.password }),
        ...(dto.rol && { rol: dto.rol as string }),
      },
    });

    return {
      message: 'Usuario actualizado exitosamente',
      data: usuarioActualizado,
    };
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica que exista antes de eliminar

    const eliminado = await this.prisma.user.delete({
      where: { id_usuario: id },
    });

    return {
      message: 'Usuario eliminado exitosamente',
      data: eliminado,
    };
  }
}