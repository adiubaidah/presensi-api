import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PertemuanDto } from './pertemuan.dto';

@Injectable()
export class PertemuanService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PertemuanDto) {
    const { kelasMatakuliahKode, ...restPayload } = payload;
    return await this.prisma.pertemuan.create({
      data: {
        ...restPayload,
        kelasMatakuliah: {
          connect: {
            id: kelasMatakuliahKode,
          },
        },
      },
    });
  }
}
