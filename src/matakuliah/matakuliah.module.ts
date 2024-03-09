import { Module } from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { MatakuliahController } from './matakuliah.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MatakuliahService, PrismaService, JwtService],
  controllers: [MatakuliahController],
})
export class MatakuliahModule {}
