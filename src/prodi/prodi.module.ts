import { Module } from '@nestjs/common';
import { ProdiController } from './prodi.controller';
import { ProdiService } from './prodi.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProdiController],
  providers: [ProdiService, PrismaService],
})
export class ProdiModule {}
