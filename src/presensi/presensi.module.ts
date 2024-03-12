import { Module } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { PresensiController } from './presensi.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PresensiService, PrismaService, JwtService],
  controllers: [PresensiController],
})
export class PresensiModule {}
