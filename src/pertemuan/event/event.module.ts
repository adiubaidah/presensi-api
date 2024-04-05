import { Module } from '@nestjs/common';
import { PertemuanEvent } from './event';
import { PertemuanService } from 'src/pertemuan/pertemuan.service';
import { PrismaService } from 'src/prisma.service';
import { PresensiService } from 'src/presensi/presensi.service';
import { KelasService } from 'src/kelas/kelas.service';

@Module({
  providers: [
    PertemuanEvent,
    PertemuanService,
    PresensiService,
    PrismaService,
    KelasService,
  ],
})
export class PresensiEventModule {}
