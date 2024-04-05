import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenModule } from './dosen/dosen.module';
import { ProdiModule } from './prodi/prodi.module';
import { PresensiModule } from './presensi/presensi.module';
import { AuthModule } from './auth/auth.module';
import { KelasModule } from './kelas/kelas.module';
import { AkunModule } from './akun/akun.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { PembelajaranModule } from './pembelajaran/pembelajaran.module';
import { PertemuanModule } from './pertemuan/pertemuan.module';

import { PresensiEventModule } from './pertemuan/event/event.module';

@Module({
  imports: [
    MahasiswaModule,
    DosenModule,
    ProdiModule,
    PresensiModule,
    AuthModule,
    KelasModule,
    MatakuliahModule,
    AkunModule,
    PembelajaranModule,
    PertemuanModule,
    PresensiEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
