import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenModule } from './dosen/dosen.module';
import { ProdiModule } from './prodi/prodi.module';
import { AbsensiModule } from './absensi/absensi.module';
import { PresensiModule } from './presensi/presensi.module';
import { AuthModule } from './auth/auth.module';
import { KelasModule } from './kelas/kelas.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { PertemuanService } from './pertemuan/pertemuan.service';
import { PertemuanController } from './pertemuan/pertemuan.controller';

@Module({
  imports: [MahasiswaModule, DosenModule, ProdiModule, AbsensiModule, PresensiModule, AuthModule, KelasModule, MatakuliahModule],
  controllers: [AppController, PertemuanController],
  providers: [AppService, PertemuanService],
})
export class AppModule {}
