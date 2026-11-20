import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  dni: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsInt()
  id_tutor: number;
}