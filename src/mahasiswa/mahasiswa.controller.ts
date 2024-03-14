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
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaDto } from './mahasiswa.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private mahasiswaService: MahasiswaService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: MahasiswaDto) {
    return await this.mahasiswaService.create(payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all() {
    return await this.mahasiswaService.all();
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':nim')
  async find(@Param('nim') nim: string) {
    return await this.mahasiswaService.find(nim);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':nim')
  async update(@Param('nim') nim: string, @Body() payload: MahasiswaDto) {
    return await this.mahasiswaService.update(nim, payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':nim')
  async delete(@Param('nim') nim: string) {
    return await this.mahasiswaService.delete(nim);
  }
}
