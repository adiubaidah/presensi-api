import { Module } from '@nestjs/common';
import { PembelajaranService } from './pembelajaran.service';
import { PembelajaranController } from './pembelajaran.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AkunService } from 'src/akun/akun.service';

@Module({
  providers: [PembelajaranService, AkunService, PrismaService, JwtService],
  controllers: [PembelajaranController],
})
export class PembelajaranModule {}
