import { Type } from 'class-transformer';
import {
  IsDate, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional,
  IsPhoneNumber, IsString, Length, Max, MaxDate, Min,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  apellido: string;

  @IsNumberString()
  @Length(7, 8)
  dni: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('AR')
  telefono?: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  fechaNacimiento: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  promedio?: number;
}