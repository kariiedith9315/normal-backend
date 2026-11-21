import {
  IsAlphanumeric, IsDefined, IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, IsUppercase, Length, Matches, Max, MaxLength,
} from 'class-validator';

export class CreateDireccionDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  calle: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Max(99999)
  numero: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  piso?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ .'-]+$/, {
    message: 'ciudad solo puede contener letras y espacios',
  })
  ciudad: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ .'-]+$/, {
    message: 'provincia solo puede contener letras y espacios',
  })
  provincia: string;

  @IsDefined()
  @IsAlphanumeric()
  @IsUppercase({ message: 'codigoPostal debe estar en mayúsculas (ej. T4000 o 4000)' })
  @Length(4, 8)
  codigoPostal: string;
}