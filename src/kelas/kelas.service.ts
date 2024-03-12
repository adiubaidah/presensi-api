import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { KelasDto } from './kelas.dto';
@Injectable()
export class KelasService {
  constructor(private prisma: PrismaService) {}

  async create(payload: KelasDto) {
    const { angkatan, nama, prodiKode } = payload;
    const result = await this.prisma.kelas.create({
      data: {
        angkatan,
        nama,
        prodi: {
          connect: {
            kode: prodiKode,
          },
        },
      },
    });
    return result;
  }

  async all() {
    return await this.prisma.kelas.findMany();
  }

  async allByProdi(prodiKode: string) {
    return await this.prisma.kelas.findMany({
      where: {
        prodiKode,
      },
    });
  }

  async update(kode: string, payload: KelasDto) {
    return await this.prisma.kelas.update({
      where: {
        kode,
      },
      data: { ...payload },
    });
  }

  async delete(kode: string) {
    return await this.prisma.kelas.delete({
      where: {
        kode,
      },
    });
  }
}
