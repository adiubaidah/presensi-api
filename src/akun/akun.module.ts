import { Module } from '@nestjs/common';
import { AkunService } from './akun.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AkunController } from './akun.controller';

@Module({
  providers: [AkunService, PrismaService, JwtService],
  controllers: [AkunController],
})
export class AkunModule {}
