import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MahasiswaService, PrismaService, JwtService],
  controllers: [MahasiswaController],
})
export class MahasiswaModule {}
