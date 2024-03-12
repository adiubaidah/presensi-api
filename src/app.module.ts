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
import { DosenMatakuliahModule } from './dosen-matakuliah/dosen-matakuliah.module';
import { KelasMatakuliahModule } from './kelas-matakuliah/kelas-matakuliah.module';
import { PertemuanModule } from './pertemuan/pertemuan.module';

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
    DosenMatakuliahModule,
    KelasMatakuliahModule,
    PertemuanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
