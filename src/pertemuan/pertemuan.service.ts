import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PertemuanDto } from './pertemuan.dto';
import * as XLSX from 'xlsx';
import { $Enums } from '@prisma/client';

@Injectable()
export class PertemuanService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PertemuanDto) {
    const { pembelajaranId, ...restPayload } = payload;
    return await this.prisma.pertemuan.create({
      data: {
        ...restPayload,
        pembelajaran: {
          connect: {
            id: pembelajaranId,
          },
        },
      },
    });
  }

  async all(pembelajaran: number) {
    return await this.prisma.pertemuan.findMany({
      where: {
        ...(pembelajaran && {
          pembelajaranId: pembelajaran,
        }),
      },
      orderBy: {
        pertemuanKe: 'asc',
      },
    });
  }

  async activePertemuan(username: string, role: $Enums.Role) {
    if (role === 'mahasiswa') {
      const result = await this.prisma.mahasiswa.findUnique({
        where: {
          akunUsername: username,
        },
        include: {
          kelas: {
            include: {
              pembelajaran: {
                include: {
                  matakuliah: true,
                  pertemuan: {
                    where: {
                      statusTimer: 'berjalan',
                    },
                  },
                },
              },
            },
          },
        },
      });
      const matkulPertemuan = result.kelas.pembelajaran.flatMap((pem) => {
        const matkul = pem.matakuliah;
        const pertemuan = pem.pertemuan.map((per) => {
          return {
            matakuliah: matkul,
            pertemuan: per,
          };
        });
        return pertemuan;
      });
      return matkulPertemuan;
    } else {
      const result = await this.prisma.dosen.findUnique({
        where: {
          akunUsername: username,
        },
        include: {
          pembelajaran: {
            include: {
              matakuliah: true,
              pertemuan: {
                where: {
                  statusTimer: 'berjalan',
                },
              },
              kelas: true,
            },
          },
        },
      });
      const matkulPertemuan = result.pembelajaran.flatMap((pem) => {
        const matkul = pem.matakuliah;
        const pertemuan = pem.pertemuan.map((per) => {
          return {
            matakuliah: matkul,
            kelas: pem.kelas,
            pertemuan: per,
          };
        });
        return pertemuan;
      });
      return matkulPertemuan;
    }
  }

  async find(id: number) {
    return await this.prisma.pertemuan.findUnique({
      where: {
        id,
      },
      include: {
        pembelajaran: {
          select: {
            totalJam: true,
          },
        },
      },
    });
  }

  async update(id: number, payload: PertemuanDto) {
    const { pembelajaranId, ...restPayload } = payload;
    return await this.prisma.pertemuan.update({
      where: {
        id,
      },
      data: {
        ...restPayload,
        pembelajaran: {
          connect: {
            id: pembelajaranId,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.pertemuan.delete({
      where: {
        id,
      },
    });
  }

  async startTimer(pertemuanId: number) {
    return await this.prisma.pertemuan.update({
      where: {
        id: pertemuanId,
      },
      data: {
        statusTimer: 'berjalan',
        waktuMulai: new Date(),
      },
    });
  }

  async stopTimer(pertemuanId: number) {
    return await this.prisma.pertemuan.update({
      where: {
        id: pertemuanId,
      },
      data: {
        statusTimer: 'selesai',
      },
    });
  }

  async downloadPresensi(pertemuanId: number, kelasKode: string) {
    const result = await this.prisma.mahasiswa.findMany({
      where: {
        kelasKode,
      },
      include: {
        presensi: {
          where: {
            pertemuanId,
          },
          orderBy: {
            jameKe: 'asc',
          },
        },
      },
    });
    const dataForExcel = [
      [
        'NIM',
        'Nama Lengkap',
        ...Array.from(
          {
            length: Math.max(...result.map((a) => a.presensi.length)),
          },
          (_, i) => i + 1,
        ),
      ],
    ];

    result.forEach((item) => {
      const jenis = item.presensi.map((p) => presensiLabel[p.jenis]);
      const row = [item.nim, item.nama, ...jenis];
      dataForExcel.push(row);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);
    // 워크북 생성 및 워크시트 추가
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    return excelBuffer;
    // return dataForExcel;
  }
}

const presensiLabel = {
  masuk: 'P',
  sakit: 'S',
  izin: 'I',
  alpha: 'A',
};
