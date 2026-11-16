import {
  IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, Length, MaxLength,
} from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  apellido: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(4, 10)
  legajo: string;

  @IsString()
  @MaxLength(100)
  especialidad: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sueldo?: number;
}