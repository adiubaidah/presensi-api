import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DosenDto } from 'src/dosen/dosen.dto';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) {}

  async create(payload: DosenDto) {
    const { akunUsername, ...restPayload } = payload;

    if (akunUsername) {
      const checkRole = await this.prisma.akun.findUnique({
        where: {
          username: akunUsername,
        },
      });

      if (checkRole.role !== 'dosen') {
        throw new BadRequestException('Akun haruslah dosen');
      }
    }

    return await this.prisma.dosen.create({
      data: {
        ...restPayload,
        akun: akunUsername ? { connect: { username: akunUsername } } : {},
      },
    });
  }

  async all() {
    return await this.prisma.dosen.findMany({
      include: {
        akun: true,
      },
    });
  }

  async update(nidn: string, payload: DosenDto) {
    const { akunUsername, ...restPayload } = payload;
    if (akunUsername) {
      const checkRole = await this.prisma.akun.findUnique({
        where: {
          username: akunUsername,
        },
      });

      if (checkRole.role !== 'dosen') {
        throw new BadRequestException('Akun haruslah dosen');
      }
    }
    return await this.prisma.dosen.update({
      where: {
        nidn,
      },
      data: {
        ...restPayload,
        // ...akunData,
        akun: akunUsername ? { connect: { username: akunUsername } } : {},
      },
    });
  }

  async delete(nidn: string) {
    return await this.prisma.dosen.delete({
      where: {
        nidn,
      },
    });
  }
}
