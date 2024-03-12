import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
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

  @Role([RoleEnum.admin, RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async allByProdi(@Query('prodi') prodi: string) {
    if (!prodi) {
      throw new BadRequestException('Request tidak valid');
    }
    return await this.kelasService.allByProdi(prodi);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: KelasDto) {
    return await this.kelasService.create(payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':kode')
  async update(@Param('kode') kode: string, @Body() payload: KelasDto) {
    return await this.kelasService.update(kode, payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':kode')
  async delete(@Param('kode') kode: string) {
    return await this.kelasService.delete(kode);
  }
}
