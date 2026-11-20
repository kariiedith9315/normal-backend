import {
  IsDateString, IsDefined, IsEmail, IsLowercase, IsNotEmpty, IsNumberString,
  IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, NotEquals,
} from 'class-validator';

export class CreateProfesorDto {
  @IsDefined({ message: 'El nombre es obligatorio' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(2, 50)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsDefined({ message: 'El apellido es obligatorio' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Length(2, 50)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  apellido: string;

  @IsDefined({ message: 'El DNI es obligatorio' })
  @IsNumberString({}, { message: 'El DNI solo puede contener números' })
  @Length(7, 8, { message: 'El DNI debe tener entre 7 y 8 dígitos' })
  @NotEquals('00000000', { message: 'El DNI no es válido' })
  dni: string;

  @IsDefined()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @MaxLength(100)
  @IsLowercase({ message: 'El email debe estar en minúsculas' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('AR', { message: 'El teléfono no es válido' })
  telefono?: string;

  @IsDefined({ message: 'La especialidad es obligatoria' })
  @IsString()
  @IsNotEmpty({ message: 'La especialidad es obligatoria' })
  @Length(3, 100)
  especialidad: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  direccion?: string;

  @IsDefined()
  @IsDateString({}, { message: 'La fecha de ingreso debe tener un formato válido (YYYY-MM-DD)' })
  fecha_ingreso: string;
}