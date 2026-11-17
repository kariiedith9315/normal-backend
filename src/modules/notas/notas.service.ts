import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto.js';

@Injectable()
export class NotasService {
  private notas = [
    { id_nota: 1, id_alumno: 1, id_materia: 1, trimestre: '1° Trimestre', nota: 8 },
  ];

  findAll() {
    return this.notas;
  }

  findByAlumno(id_alumno: number) {
    const resultado = this.notas.filter(n => n.id_alumno === id_alumno);
    if (resultado.length === 0) {
      throw new NotFoundException(`No se encontraron notas para el alumno con ID ${id_alumno}`);
    }
    return resultado;
  }

  create(dto: CreateNotaDto) {
    const nuevaNota = {
      id_nota: this.notas.length + 1,
      ...dto,
    };
    this.notas.push(nuevaNota);
    return {
      message: 'Calificación registrada exitosamente',
      data: nuevaNota,
    };
  }
}