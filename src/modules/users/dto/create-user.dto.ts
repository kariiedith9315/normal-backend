import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  DIRECTOR = 'DIRECTOR',
  PROFESOR = 'PROFESOR',
  ALUMNO = 'ALUMNO',
  TUTOR = 'TUTOR',
}

export class CreateUserDto {
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'El rol debe ser: DIRECTOR, PROFESOR, ALUMNO o TUTOR' })
  rol: UserRole;
}
