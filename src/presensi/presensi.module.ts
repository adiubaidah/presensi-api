import { Module } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { PresensiController } from './presensi.controller';

@Module({
  providers: [PresensiService],
  controllers: [PresensiController]
})
export class PresensiModule {}
