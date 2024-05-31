import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Delete,
  Res,
  Param,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PertemuanService } from './pertemuan.service';
import { PertemuanDto } from './pertemuan.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('pertemuan')
export class PertemuanController {
  constructor(
    private pertemuanService: PertemuanService,
    private jwtService: JwtService,
  ) {}

  @Role([RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: PertemuanDto) {
    return await this.pertemuanService.create(payload);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin, RoleEnum.mahasiswa])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Query('pembelajaran') pembelajaran: number) {
    return await this.pertemuanService.all(pembelajaran);
  }

  @Role([RoleEnum.dosen, RoleEnum.mahasiswa])
  @UseGuards(JwtGuard, RoleGuard)
  @Get('active-pertemuan')
  async pertemuan(@Req() req: Request) {
    const user = req['user'];
    console.log(user);
    return this.pertemuanService.activePertemuan(user.username, user.role);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.pertemuanService.find(id);
  }

  @Get(':id/presensi')
  async downloadPresensi(
    @Param('id') id: number,
    @Query('kelas') kelas: string,
    @Res() res: Response,
  ) {
    const buffer = await this.pertemuanService.downloadPresensi(id, kelas);
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="presensi.xlsx"',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    return res.send(buffer);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: PertemuanDto) {
    return await this.pertemuanService.update(id, payload);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.pertemuanService.delete(id);
  }
}
