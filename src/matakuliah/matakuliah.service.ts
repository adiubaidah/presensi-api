import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MatakuliahDto } from './matakuliah.dto';
import _ from 'underscore';
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

  async allByDosen(dosenNidn: string) {
    const result = await this.prisma.pembelajaran.findMany({
      where: {
        dosenNidn,
      },
      distinct: ['matakuliahKode'],
      include: {
        matakuliah: true,
      },
    });
    const response = _.map(result, (item) => item.matakuliah);
    return response;
  }

  async findByDosen(dosenNidn: string, kode: string) {
    const result = await this.prisma.matakuliah.findUnique({
      where: {
        kode,
      },
      include: {
        pembelajaran: {
          where: {
            dosenNidn,
          },
          include: {
            kelas: {
              include: {
                prodi: true,
              },
            },
          },
        },
      },
    });
    const kelas = result.pembelajaran.map((pmb) => {
      const kelas = pmb.kelas;
      const id = pmb.id;
      return { pembelajaranId: id, ...kelas };
    });
    const matakuliah = _.omit(result, 'pembelajaran');

    const payload = { ...matakuliah, kelas };

    return payload;
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
