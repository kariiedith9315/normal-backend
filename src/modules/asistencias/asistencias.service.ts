import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto.js';

@Injectable()
export class AsistenciasService {
  private asistencias = [
    { id_asistencia: 1, id_alumno: 1, id_materia: 1, fecha: '2026-03-20', estado: 'Presente' },
  ];

  findAll() {
    return this.asistencias;
  }

  findByAlumno(id_alumno: number) {
    const resultado = this.asistencias.filter(a => a.id_alumno === id_alumno);
    if (resultado.length === 0) {
      throw new NotFoundException(`No se encontraron registros de asistencia para el alumno con ID ${id_alumno}`);
    }
    return resultado;
  }

  create(dto: CreateAsistenciaDto) {
    const nuevaAsistencia = {
      id_asistencia: this.asistencias.length + 1,
      ...dto,
    };
    this.asistencias.push(nuevaAsistencia);
    
    return {
      message: 'Asistencia registrada exitosamente',
      data: nuevaAsistencia,
    };
  }
}