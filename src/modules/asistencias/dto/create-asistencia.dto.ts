import { IsNumber, IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  id_alumno: number;

  @IsNumber()
  @IsNotEmpty()
  id_materia: number;

  @IsString()
  @IsNotEmpty()
  fecha: string; // Formato: "YYYY-MM-DD"

  @IsString()
  @IsNotEmpty()
  @IsIn(['Presente', 'Ausente', 'Justificado', 'Tardanza'])
  estado: string;
}