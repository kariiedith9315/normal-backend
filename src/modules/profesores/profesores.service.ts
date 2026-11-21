import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';
import { UpdateProfesorDto } from './dto/update-profesor.dto.js';

// 1. Definimos la interfaz que tipa correctamente los campos opcionales (?)
export interface Profesor {
  id_profesor: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono?: string;
  especialidad: string;
  direccion?: string;
  fecha_ingreso: string;
}

@Injectable()
export class ProfesoresService {
  // 2. Tipamos explícitamente el arreglo con la interfaz Profesor[]
  private profesores: Profesor[] = [
    {
      id_profesor: 1,
      nombre: 'Carlos',
      apellido: 'Martínez',
      dni: '28111222',
      email: 'carlos.martinez@escuela.edu',
      telefono: '3814000000',
      especialidad: 'Matemáticas',
      direccion: 'Av. Mate de Luna 1234',
      fecha_ingreso: '2020-03-01',
    },
  ];

  findAll() {
    return this.profesores;
  }

  findOne(id: number) {
    const profesor = this.profesores.find((p) => p.id_profesor === id);
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  create(dto: CreateProfesorDto) {
    const nuevoProfesor: Profesor = {
      id_profesor: this.profesores.length + 1,
      ...dto,
    };
    
    this.profesores.push(nuevoProfesor); // 👈 ¡Ahora TypeScript lo reconoce sin errores!
    
    return {
      message: 'Profesor creado exitosamente',
      data: nuevoProfesor,
    };
  }

  update(id: number, dto: UpdateProfesorDto) {
    const index = this.profesores.findIndex((p) => p.id_profesor === id);
    if (index === -1) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }

    this.profesores[index] = {
      ...this.profesores[index],
      ...dto,
    };

    return {
      message: 'Profesor actualizado exitosamente',
      data: this.profesores[index],
    };
  }

  remove(id: number) {
    const index = this.profesores.findIndex((p) => p.id_profesor === id);
    if (index === -1) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }

    const eliminado = this.profesores.splice(index, 1);
    return {
      message: 'Profesor eliminado exitosamente',
      data: eliminado[0],
    };
  }
}