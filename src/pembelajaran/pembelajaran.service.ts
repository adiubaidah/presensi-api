import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PembelajaranDto } from './pembelajaran.dto';

@Injectable()
export class PembelajaranService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PembelajaranDto) {
    const { kelasKode, matakuliahKode, dosenNidn, ...restPayload } = payload;
    return await this.prisma.pembelajaran.create({
      data: {
        kelas: {
          connect: {
            kode: kelasKode,
          },
        },
        matakuliah: {
          connect: {
            kode: matakuliahKode,
          },
        },
        dosen: {
          connect: {
            nidn: dosenNidn,
          },
        },
        ...restPayload,
      },
    });
  }

  async currentSemester(nim: string, kelasKode: string) {
    if (nim) {
      return await this.prisma.$queryRaw`SELECT
         MAX(pemb.semester) AS semester
      FROM
        public."Mahasiswa" as mhs
        INNER JOIN public."Kelas" AS kelas ON mhs."kelasKode" = kelas.kode
        INNER JOIN public."Pembelajaran" AS pemb ON pemb."kelasKode" = kelas.kode
      WHERE mhs.nim = ${nim}`;
    } else if (kelasKode) {
      return await this.prisma.$queryRaw`SELECT
        MAX(pemb.semester) AS semester
      FROM public."Kelas" AS kelas ON mhs."kelasKode" = kelas.kode
        INNER JOIN public."Pembelajaran" AS pemb ON pemb."kelasKode" = kelas.kode
        WHERE kelas.kode = ${kelasKode}`;
    }
  }

  async findByKelas(kelasKode: string) {
    return await this.prisma.pembelajaran.findMany({
      where: {
        kelasKode,
      },
      include: {
        matakuliah: true,
        dosen: true,
      },
    });
  }

  async findByMatakuliahKelas(matakuliah: string, kelas: string) {
    return await this.prisma.pembelajaran.findFirst({
      where: {
        matakuliahKode: matakuliah,
        AND: {
          kelasKode: kelas,
        },
      },
      include: {
        matakuliah: true,
      },
    });
  }

  async find(id: number) {
    return await this.prisma.pembelajaran.findUnique({
      where: {
        id,
      },
      include: {
        matakuliah: true,
        kelas: true,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.pembelajaran.delete({
      where: {
        id,
      },
    });
  }
}
