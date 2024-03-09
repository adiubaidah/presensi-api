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
    const akunData = akunUsername
      ? { connect: { username: akunUsername } }
      : {};

    return await this.prisma.mahasiswa.create({
      data: {
        ...restPayload,
        kelas: {
          connect: {
            kode: kelasKode,
          },
        },
        ...akunData,
      },
    });
  }

  async all() {
    return await this.prisma.mahasiswa.findMany({
      include: {
        kelas: true,
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

    const akunData = akunUsername
      ? { connect: { username: akunUsername } }
      : {};
    return await this.prisma.mahasiswa.update({
      where: {
        nim,
      },
      data: {
        ...restPayload,
        kelas: {
          connect: {
            kode: kelasKode,
          },
        },
        akun: { ...akunData },
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
