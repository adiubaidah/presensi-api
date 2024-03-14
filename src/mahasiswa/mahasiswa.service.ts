import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MahasiswaDto } from './mahasiswa.dto';

@Injectable()
export class MahasiswaService {
  constructor(private prisma: PrismaService) {}

  async create(payload: MahasiswaDto) {
    const { kelasKode, akunUsername, ...restPayload } = payload;

    if (akunUsername) {
      const checkRole = await this.prisma.akun.findUnique({
        where: {
          username: akunUsername,
        },
      });

      if (checkRole.role !== 'mahasiswa') {
        throw new BadRequestException('Akun harus mahasiswa');
      }
    }
    return await this.prisma.mahasiswa.create({
      data: {
        ...restPayload,
        // ...kelasData,
        kelas: kelasKode
          ? {
              connect: {
                kode: kelasKode,
              },
            }
          : {},
        akun: akunUsername
          ? {
              connect: {
                username: akunUsername,
              },
            }
          : {},
      },
    });
  }

  async all() {
    return await this.prisma.mahasiswa.findMany({
      include: {
        kelas: {
          include: {
            prodi: true,
          },
        },
      },
    });
  }

  async find(nim: string) {
    return await this.prisma.mahasiswa.findUnique({
      where: {
        nim,
      },
      include: {
        kelas: {
          include: {
            prodi: true,
          },
        },
      },
    });
  }

  async mahasiswaWithNoKelas() {
    return await this.prisma.mahasiswa.findMany({
      where: {
        kelas: null,
      },
    });
  }

  async update(nim: string, payload: MahasiswaDto) {
    const { akunUsername, kelasKode, ...restPayload } = payload;
    if (akunUsername) {
      const checkRole = await this.prisma.akun.findUnique({
        where: {
          username: akunUsername,
        },
      });

      if (checkRole.role !== 'mahasiswa') {
        throw new BadRequestException('Akun harus mahasiswa');
      }
    }

    return await this.prisma.mahasiswa.update({
      where: {
        nim,
      },
      data: {
        ...restPayload,
        kelas: kelasKode
          ? {
              connect: {
                kode: kelasKode,
              },
            }
          : {},
        akun: akunUsername
          ? {
              connect: {
                username: akunUsername,
              },
            }
          : {},
      },
    });
  }

  async delete(nim: string) {
    return await this.prisma.mahasiswa.delete({
      where: {
        nim,
      },
    });
  }
}
