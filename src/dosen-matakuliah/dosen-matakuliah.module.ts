import { Module } from '@nestjs/common';
import { DosenMatakuliahService } from './dosen-matakuliah.service';
import { DosenMatakuliahController } from './dosen-matakuliah.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DosenMatakuliahService, PrismaService, JwtService],
  controllers: [DosenMatakuliahController],
})
export class DosenMatakuliahModule {}
