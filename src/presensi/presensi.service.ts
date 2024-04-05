import { Injectable } from '@nestjs/common';
import { $Enums, Presensi } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

type NewPresensi = Omit<Presensi, 'id' | 'keterangan'>;

@Injectable()
export class PresensiService {
  constructor(private prisma: PrismaService) {}

  async create(
    pertemuanId: number,
    mahasiswaNim: string,
    jenis: $Enums.JenisAbsensi,
  ) {
    //ambil total jam dari matakuliah

    const totalJamMatkul = await this.prisma.pertemuan
      .findUnique({
        where: {
          id: pertemuanId,
        },
        include: {
          pembelajaran: {
            select: {
              totalJam: true,
            },
          },
        },
      })
      .then((data) => data.pembelajaran.totalJam);

    const presensiMasukKelas: NewPresensi[] = [];

    for (let i = 1; i <= totalJamMatkul; i++) {
      presensiMasukKelas.push({
        jameKe: i,
        jenis,
        mahasiswaNim,
        pertemuanId,
      });
    }
    // totalJamMatkul.kelasMatakuliah.totalJam

    const result = await this.prisma.presensi.createMany({
      data: presensiMasukKelas,
    });
    return result;
  }
}
