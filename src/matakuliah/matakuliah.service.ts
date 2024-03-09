import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MatakuliahDto } from './matakuliah.dto';

@Injectable()
export class MatakuliahService {
  constructor(private prisma: PrismaService) {}

  async create(payload: MatakuliahDto) {
    return await this.prisma.matakuliah.create({
      data: {
        ...payload,
      },
    });
  }

  async all() {
    return await this.prisma.matakuliah.findMany();
  }

  async update(kode: string, payload: MatakuliahDto) {
    return await this.prisma.matakuliah.update({
      where: {
        kode,
      },
      data: {
        ...payload,
      },
    });
  }

  async delete(kode: string) {
    return await this.prisma.matakuliah.delete({
      where: {
        kode,
      },
    });
  }
}
