import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @Length(7, 10, { message: 'El DNI debe tener entre 7 y 10 caracteres' })
  dni: string;

  @IsString()
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  fecha_nacimiento: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string;

  @IsOptional()
  @IsInt({ message: 'El id_tutor debe ser un número entero' })
  id_tutor?: number;
}