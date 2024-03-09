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

    const akunData = akunUsername
      ? { connect: { username: akunUsername } }
      : {};
    return await this.prisma.dosen.create({
      data: {
        ...restPayload,
        ...akunData,
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
    const akunData = akunUsername
      ? { connect: { username: akunUsername } }
      : {};
    return await this.prisma.dosen.update({
      where: {
        nidn,
      },
      data: {
        ...restPayload,
        // ...akunData,
        akun: { ...akunData },
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
