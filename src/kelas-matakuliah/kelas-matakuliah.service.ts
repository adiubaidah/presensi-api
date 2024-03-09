import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KelasMatakuliahDto } from './kelas-matakuliah.dto';

@Injectable()
export class KelasMatakuliahService {
  constructor(private prisma: PrismaService) {}

  async create(payload: KelasMatakuliahDto) {
    const { kelasKode, matakuliahKode, ...restPayload } = payload;
    return await this.prisma.kelasOnMatakuliah.create({
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
        ...restPayload,
      },
    });
  }
}
