import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';

import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PembelajaranService } from './pembelajaran.service';
import { PembelajaranDto } from './pembelajaran.dto';

@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
@Controller('pembelajaran')
export class PembelajaranController {
  constructor(private pembelajaranService: PembelajaranService) {}

  @Post()
  async create(@Body() payload: PembelajaranDto) {
    return await this.pembelajaranService.create(payload);
  }

  @Get()
  async all(@Query('kelas') kelas: string) {
    return await this.pembelajaranService.findByKelas(kelas);
  }
}
