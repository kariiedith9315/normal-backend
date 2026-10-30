import { Module } from '@nestjs/common';
import { DireccionController } from './direccion.controller.js';

@Module({
  controllers: [DireccionController]
})
export class DireccionModule {}
