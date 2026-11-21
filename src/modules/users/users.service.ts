import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface User {
  id_usuario: number;
  email: string;
  password: string;
  rol: string;
  activo: boolean;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id_usuario: 1,
      email: 'director@escuela.edu',
      password: '123456',
      rol: 'DIRECTOR',
      activo: true,
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id_usuario === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

create(dto: CreateUserDto) {
    const nuevoUsuario: User = {
      id_usuario: this.users.length + 1,
      email: dto.email,
      password: dto.password,
      rol: dto.rol as string, // Aseguramos el tipo string si usas un enum
      activo: true,
    };

    this.users.push(nuevoUsuario);
    
    return {
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario,
    };
  }

  update(id: number, dto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id_usuario === id);
    if (index === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    this.users[index] = {
      ...this.users[index],
      ...dto,
    };

    return {
      message: 'Usuario actualizado exitosamente',
      data: this.users[index],
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id_usuario === id);
    if (index === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const eliminado = this.users.splice(index, 1);
    return {
      message: 'Usuario eliminado exitosamente',
      data: eliminado[0],
    };
  }
}