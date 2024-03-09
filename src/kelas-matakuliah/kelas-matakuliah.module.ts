import { Module } from '@nestjs/common';
import { KelasMatakuliahService } from './kelas-matakuliah.service';
import { KelasMatakuliahController } from './kelas-matakuliah.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [KelasMatakuliahService, PrismaService, JwtService],
  controllers: [KelasMatakuliahController],
})
export class KelasMatakuliahModule {}
