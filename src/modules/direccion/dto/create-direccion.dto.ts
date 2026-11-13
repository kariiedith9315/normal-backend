import {
  IsAlphanumeric, IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, Length, MaxLength,
} from 'class-validator';

export class CreateDireccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  calle: string;

  @IsNumber()
  @IsPositive()
  numero: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  piso?: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsAlphanumeric()
  @Length(4, 8)
  codigoPostal: string;
}