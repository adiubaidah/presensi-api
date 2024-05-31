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
  Req,
} from '@nestjs/common';

import { Mahasiswa, Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PembelajaranService } from './pembelajaran.service';
import { PembelajaranDto } from './pembelajaran.dto';
import { Request } from 'express';
import { AkunService } from 'src/akun/akun.service';

@Controller('pembelajaran')
export class PembelajaranController {
  constructor(
    private pembelajaranService: PembelajaranService,
    private akunService: AkunService,
  ) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: PembelajaranDto) {
    return await this.pembelajaranService.create(payload);
  }

  @Role([RoleEnum.admin, RoleEnum.mahasiswa])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(
    @Req() req: Request,
    @Query('kelas') kelas: string,
    matakuliah: string,
  ) {
    const user = req['user'];
    if (user.role === 'mahasiswa') {
      const detailAkun = (await this.akunService.akunDetail(
        user.username,
      )) as unknown as Mahasiswa;
      const pembelajaran = await this.pembelajaranService.findByKelas(
        detailAkun.kelasKode,
      );
      return pembelajaran;
    } else if (kelas && matakuliah) {
      return await this.pembelajaranService.findByMatakuliahKelas(
        matakuliah,
        kelas,
      );
    } else if (kelas) {
      return await this.pembelajaranService.findByKelas(kelas);
    }
    throw new BadRequestException('Request tidak valid');
  }

  @Role([RoleEnum.mahasiswa, RoleEnum.dosen, RoleEnum.admin])
  @Get('current-semester')
  async currentSemester(
    @Query('nim') nim: string,
    @Query('kelas') kelasKode: string,
  ) {
    return await this.pembelajaranService.currentSemester(nim, kelasKode);
  }

  @Role([RoleEnum.admin, RoleEnum.dosen, RoleEnum.mahasiswa])
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
