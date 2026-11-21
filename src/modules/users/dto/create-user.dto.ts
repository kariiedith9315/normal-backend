import {
  Equals, IsBoolean, IsDefined, IsEmail, IsEnum, IsLowercase, IsNotEmpty,
  IsOptional, IsString, IsStrongPassword, MaxLength, MinLength,
} from 'class-validator';

export enum UserRole {
  DIRECTOR = 'DIRECTOR',
  PROFESOR = 'PROFESOR',
  ALUMNO = 'ALUMNO',
  TUTOR = 'TUTOR',
}

export class CreateUserDto {
  @IsDefined()
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(100)
  @IsLowercase({ message: 'El correo debe estar en minúsculas' })
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(64)
  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 },
    { message: 'La contraseña debe incluir mayúscula, minúscula y número' },
  )
  password: string;

  @IsDefined()
  @IsEnum(UserRole, { message: 'El rol debe ser: DIRECTOR, PROFESOR, ALUMNO o TUTOR' })
  rol: UserRole;
}
