import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { DosenMatakuliahService } from './dosen-matakuliah.service';
import { DosenMatakuliahDto } from './dosen-matakuliah.dto';

@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
@Controller('dosen-matakuliah')
export class DosenMatakuliahController {
  constructor(private dosenMatakuliahService: DosenMatakuliahService) {}

  @Post()
  async create(@Body() payload: DosenMatakuliahDto) {
    return await this.dosenMatakuliahService.create(payload);
  }
}
