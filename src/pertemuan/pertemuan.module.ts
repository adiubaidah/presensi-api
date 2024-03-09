import { Module } from '@nestjs/common';
import { PertemuanService } from './pertemuan.service';
import { PertemuanController } from './pertemuan.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PertemuanService, PrismaService, JwtService],
  controllers: [PertemuanController],
})
export class PertemuanModule {}
