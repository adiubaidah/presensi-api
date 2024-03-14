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
}
