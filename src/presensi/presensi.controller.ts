import {
  Controller,
  Get,
  Query,
  UseGuards,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UpdatePresensiDto } from './presensi.dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('presensi')
export class PresensiController {
  constructor(private presensiService: PresensiService) {}

  @Role([RoleEnum.dosen, RoleEnum.admin, RoleEnum.mahasiswa])
  @Get()
  async all(@Query('nim') nim: string, @Query('pertemuan') pertemuan: number) {
    return await this.presensiService.all(nim, pertemuan);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdatePresensiDto) {
    return await this.presensiService.update(id, body.jenis);
  }
  @Role([RoleEnum.dosen, RoleEnum.admin])
  @Put()
  async updateMassal(
    @Query('pertemuan') pertemuan: number,
    @Query('nim') nim: string,
    @Body() body: UpdatePresensiDto,
  ) {
    return await this.presensiService.updateMassal(nim, pertemuan, body.jenis);
  }
}
