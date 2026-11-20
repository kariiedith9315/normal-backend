import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(100)
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(64)
  password: string;
}