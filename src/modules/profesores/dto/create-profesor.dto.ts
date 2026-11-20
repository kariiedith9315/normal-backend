import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfesorDto {
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

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  especialidad: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  direccion?: string;

  @IsDateString()
  fecha_ingreso: string;
}