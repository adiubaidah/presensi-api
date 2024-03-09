import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { KelasMatakuliahService } from './kelas-matakuliah.service';
import { KelasMatakuliahDto } from './kelas-matakuliah.dto';

@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
@Controller('kelas-matakuliah')
export class KelasMatakuliahController {
  constructor(private kelasMatakuliahService: KelasMatakuliahService) {}

  @Post()
  async create(@Body() payload: KelasMatakuliahDto) {
    return await this.kelasMatakuliahService.create(payload);
  }
}
