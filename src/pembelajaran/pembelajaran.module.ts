import { Module } from '@nestjs/common';
import { PembelajaranService } from './pembelajaran.service';
import { PembelajaranController } from './pembelajaran.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PembelajaranService, PrismaService, JwtService],
  controllers: [PembelajaranController],
})
export class PembelajaranModule {}
