import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PembelajaranService } from './pembelajaran.service';
import { PembelajaranDto } from './pembelajaran.dto';

@Controller('pembelajaran')
export class PembelajaranController {
  constructor(private pembelajaranService: PembelajaranService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: PembelajaranDto) {
    return await this.pembelajaranService.create(payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Query('kelas') kelas: string, matakuliah: string) {
    if (kelas && matakuliah) {
      return await this.pembelajaranService.findByMatakuliahKelas(
        matakuliah,
        kelas,
      );
    }

    if (kelas) {
      return await this.pembelajaranService.findByKelas(kelas);
    }
    throw new BadRequestException('Request tidak valid');
  }

  @Role([RoleEnum.admin, RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async pertemuan(@Param('id') id: number) {
    return await this.pembelajaranService.find(id);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.pembelajaranService.delete(id);
  }
}
