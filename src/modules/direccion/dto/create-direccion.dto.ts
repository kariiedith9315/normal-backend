import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDireccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  calle: string;

  @IsInt()
  numero: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  ciudad: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  provincia?: string;
}