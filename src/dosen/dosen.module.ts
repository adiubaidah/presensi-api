import { Module } from '@nestjs/common';
import { DosenController } from './dosen.controller';
import { DosenService } from './dosen.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DosenController],
  providers: [DosenService, PrismaService, JwtService],
})
export class DosenModule {}
