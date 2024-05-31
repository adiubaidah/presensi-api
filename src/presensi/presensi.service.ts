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

  async all(nim: string, pertemuanId: number) {
    const result = await this.prisma.presensi.findMany({
      where: {
        mahasiswaNim: nim,
        AND: {
          pertemuanId,
        },
      },
      orderBy: {
        jameKe: 'asc',
      },
    });
    const kehadiranPresentase = result.filter((item) => item.jenis === 'masuk');
    return {
      result,
      presentaseKehadiran: (kehadiranPresentase.length / result.length) * 100,
    };
  }

  async update(id: number, jenis: $Enums.JenisAbsensi) {
    return await this.prisma.presensi.update({
      where: {
        id,
      },
      data: {
        jenis,
      },
    });
  }

  async updateMassal(
    nim: string,
    pertemuanId: number,
    jenis: $Enums.JenisAbsensi,
  ) {
    return await this.prisma.presensi.updateMany({
      where: {
        mahasiswaNim: nim,
        AND: {
          pertemuanId,
        },
      },
      data: {
        jenis,
      },
    });
  }
}
