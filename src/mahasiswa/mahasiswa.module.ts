import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MahasiswaService, PrismaService],
  controllers: [MahasiswaController],
})
export class MahasiswaModule {}
