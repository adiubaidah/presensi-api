import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { AnggotaKelasDto, KelasDto } from './kelas.dto';
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

  async newAnggota(kelasKode: string, payload: AnggotaKelasDto) {
    return await this.prisma.mahasiswa.update({
      where: {
        nim: payload.nim,
      },
      data: {
        kelas: {
          connect: {
            kode: kelasKode,
          },
        },
      },
    });
  }

  async findAnggota(kelasKode: string) {
    return await this.prisma.mahasiswa.findMany({
      where: {
        kelasKode,
      },
    });
  }

  async deleteAnggota(payload: AnggotaKelasDto) {
    return await this.prisma.mahasiswa.update({
      where: {
        nim: payload.nim,
      },
      data: {
        kelas: null,
      },
    });
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

  async find(kode: string) {
    return await this.prisma.kelas.findUnique({
      where: {
        kode,
      },
      include: {
        mahasiswa: true,
        prodi: true,
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
