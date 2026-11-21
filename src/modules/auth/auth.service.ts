import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.activo || user.password !== dto.password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      message: '¡Bienvenido al sistema!',
      user: {
        id_usuario: user.id_usuario,
        email: user.email,
        rol: user.rol,
      },
      token: `fake-jwt-token-${user.rol.toLowerCase()}-${user.id_usuario}`,
    };
  }
}