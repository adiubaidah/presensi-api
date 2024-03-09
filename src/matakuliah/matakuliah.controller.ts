import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { MatakuliahService } from './matakuliah.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { MatakuliahDto } from './matakuliah.dto';

@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
@Controller('matakuliah')
export class MatakuliahController {
  constructor(private matakuliahService: MatakuliahService) {}

  @Post()
  async create(@Body() payload: MatakuliahDto) {
    return await this.matakuliahService.create(payload);
  }

  @Get()
  async all() {
    return await this.matakuliahService.all();
  }

  @Put(':kode')
  async update(@Param('kode') kode: string, payload: MatakuliahDto) {
    return await this.matakuliahService.update(kode, payload);
  }

  @Delete(':kode')
  async delete(@Param('kode') kode: string) {
    return await this.matakuliahService.delete(kode);
  }
}
