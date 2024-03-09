import { Module } from '@nestjs/common';
import { ProdiController } from './prodi.controller';
import { ProdiService } from './prodi.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProdiController],
  providers: [ProdiService, PrismaService, JwtService],
})
export class ProdiModule {}
