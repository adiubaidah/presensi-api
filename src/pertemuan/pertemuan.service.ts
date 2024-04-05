import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PertemuanDto } from './pertemuan.dto';

@Injectable()
export class PertemuanService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PertemuanDto) {
    const { pembelajaranId, ...restPayload } = payload;
    return await this.prisma.pertemuan.create({
      data: {
        ...restPayload,
        pembelajaran: {
          connect: {
            id: pembelajaranId,
          },
        },
      },
    });
  }

  async all(pembelajaran: number) {
    return await this.prisma.pertemuan.findMany({
      where: {
        pembelajaranId: pembelajaran,
      },
    });
  }

  async find(id: number) {
    return await this.prisma.pertemuan.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, payload: PertemuanDto) {
    const { pembelajaranId, ...restPayload } = payload;
    return await this.prisma.pertemuan.update({
      where: {
        id,
      },
      data: {
        ...restPayload,
        pembelajaran: {
          connect: {
            id: pembelajaranId,
          },
        },
      },
    });
  }

  async startTimer(pertemuanId: number) {
    return await this.prisma.pertemuan.update({
      where: {
        id: pertemuanId,
      },
      data: {
        statusTimer: 'berjalan',
        waktuMulai: new Date(),
      },
    });
  }

  async stopTimer(pertemuanId: number) {
    return await this.prisma.pertemuan.update({
      where: {
        id: pertemuanId,
      },
      data: {
        statusTimer: 'selesai',
      },
    });
  }
}
