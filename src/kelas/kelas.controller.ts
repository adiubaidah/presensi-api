import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { KelasService } from './kelas.service';
import { KelasDto } from './kelas.dto';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
@Controller('kelas')
export class KelasController {
  constructor(private kelasService: KelasService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all() {
    return await this.kelasService.all();
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: KelasDto) {
    return await this.kelasService.create(payload);
  }
}
