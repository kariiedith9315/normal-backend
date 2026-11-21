// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js'; // Ajusta la ruta según tu archivo dto
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    // Validación temporal de prueba (puedes adaptarla luego con tu base de datos)
    if (dto.email === 'director@escuela.edu' && dto.password === '123456') {
      return {
        message: '¡Bienvenido al sistema!',
        role: 'DIRECTOR',
        token: 'fake-jwt-token-director-123',
      };
    }

    throw new UnauthorizedException('Credenciales incorrectas');
  }
}