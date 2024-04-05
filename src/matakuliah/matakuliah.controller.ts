import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { MatakuliahService } from './matakuliah.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { MatakuliahDto } from './matakuliah.dto';
import { Request } from 'express';

@Controller('matakuliah')
export class MatakuliahController {
  constructor(private matakuliahService: MatakuliahService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: MatakuliahDto) {
    return await this.matakuliahService.create(payload);
  }

  @Role([RoleEnum.admin, RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Req() req: Request) {
    const user = req['user'];
    if (user.role === RoleEnum.dosen) {
      return await this.matakuliahService.allByDosen(user.username);
    }
    return await this.matakuliahService.all();
  }

  @Role([RoleEnum.admin, RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':kode/kelas')
  async find(@Req() req: Request, @Param('kode') kode: string) {
    const user = req['user'];
    if (user.role === RoleEnum.dosen) {
      return await this.matakuliahService.findByDosen(user.username, kode);
    }
    return await this.matakuliahService.all();
  }

  @Put(':kode')
  async update(@Param('kode') kode: string, @Body() payload: MatakuliahDto) {
    return await this.matakuliahService.update(kode, payload);
  }

  @Delete(':kode')
  async delete(@Param('kode') kode: string) {
    return await this.matakuliahService.delete(kode);
  }
}
