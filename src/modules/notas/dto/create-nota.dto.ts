import { IsNumber, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateNotaDto {
  @IsNumber()
  @IsNotEmpty()
  id_alumno: number;

  @IsNumber()
  @IsNotEmpty()
  id_materia: number;

  @IsString()
  @IsNotEmpty()
  trimestre: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  nota: number;
}