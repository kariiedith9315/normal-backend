import { IsEmail, IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  dni: string;

  @IsEmail({}, { message: 'El formato del email no es válido' })
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  @IsNotEmpty({ message: 'La especialidad es obligatoria' })
  especialidad: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsDateString({}, { message: 'La fecha de ingreso debe tener un formato válido (YYYY-MM-DD)' })
  fecha_ingreso: string;
}