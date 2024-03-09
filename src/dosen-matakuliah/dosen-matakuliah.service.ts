import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DosenMatakuliahDto } from './dosen-matakuliah.dto';

@Injectable()
export class DosenMatakuliahService {
  constructor(private prisma: PrismaService) {}

  async create(payload: DosenMatakuliahDto) {
    const { dosenNidn, matakuliahKode, totalJam } = payload;
    return await this.prisma.dosenOnMatakuliah.create({
      data: {
        totalJam,
        dosen: {
          connect: {
            nidn: dosenNidn,
          },
        },
        matakuliah: {
          connect: {
            kode: matakuliahKode,
          },
        },
      },
    });
  }
}
