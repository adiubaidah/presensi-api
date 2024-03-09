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
}
