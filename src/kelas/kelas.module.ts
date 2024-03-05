import { Module } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { KelasController } from './kelas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [KelasService, PrismaService],
  controllers: [KelasController],
})
export class KelasModule {}
