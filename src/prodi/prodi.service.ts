import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdiDto } from './prodi.dto';

@Injectable()
export class ProdiService {
  constructor(private prisma: PrismaService) {}

  async create(payload: ProdiDto) {
    return await this.prisma.prodi.create({ data: { ...payload } });
  }

  async all() {
    return await this.prisma.prodi.findMany();
  }
}
