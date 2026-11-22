import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id_usuario: true,
        email: true,
        rol: true,
        activo: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_usuario: id },
      select: {
        id_usuario: true,
        email: true,
        rol: true,
        activo: true,
      },
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

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const nuevoUsuario = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        rol: dto.rol as string,
        activo: true,
      },
    });

    const { password, ...usuarioSinPassword } = nuevoUsuario;

    return {
      message: 'Usuario registrado exitosamente',
      data: usuarioSinPassword,
    };
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    const dataToUpdate: any = {
      ...(dto.email && { email: dto.email }),
      ...(dto.rol && { rol: dto.rol as string }),
    };

    if (dto.password) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }

    const actualizado = await this.prisma.user.update({
      where: { id_usuario: id },
      data: dataToUpdate,
    });

    const { password, ...usuarioSinPassword } = actualizado;

    return {
      message: 'Usuario actualizado exitosamente',
      data: usuarioSinPassword,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    const eliminado = await this.prisma.user.delete({
      where: { id_usuario: id },
    });

    return {
      message: 'Usuario eliminado exitosamente',
      data: eliminado,
    };
  }
}