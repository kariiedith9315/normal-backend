import { Type } from 'class-transformer';
import {
  ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsArray, IsDate, IsDefined, IsEmail,
  IsInt, IsLowercase, IsNotEmpty, IsNumber, IsNumberString, IsOptional,
  IsPhoneNumber, IsPositive, IsString, Length, Matches, Max, MaxDate, MaxLength,
  MinDate, NotEquals,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/, {
    message: 'nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/, {
    message: 'apellido solo puede contener letras y espacios',
  })
  apellido: string;

  @IsDefined()
  @IsNumberString()
  @Length(7, 8)
  @NotEquals('00000000', { message: 'dni no es válido' })
  dni: string;

  @IsDefined()
  @IsEmail()
  @MaxLength(100)
  @IsLowercase()
  email: string;

  @IsOptional()
  @IsPhoneNumber('AR')
  telefono?: string;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date('1950-01-01'))
  @MaxDate(new Date())
  fechaNacimiento: Date;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(10)
  promedio?: number;

  // OPCIONAL: ids de las materias del alumno (úsalo solo si el equipo lo acepta)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(15)
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  materias?: number[];
}