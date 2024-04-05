import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { DosenService } from './dosen.service';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { DosenDto } from './dosen.dto';

@Controller('dosen')
export class DosenController {
  constructor(private dosenService: DosenService) {}

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: DosenDto) {
    return await this.dosenService.create(payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all() {
    return await this.dosenService.all();
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':nidn')
  async find(@Param('nidn') nidn: string) {
    return await this.dosenService.find(nidn);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':nidn')
  async update(@Param('nidn') nidn: string, @Body() payload: DosenDto) {
    return await this.dosenService.update(nidn, payload);
  }

  @Role([RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':nidn')
  async delete(@Param('nidn') nim: string) {
    return await this.dosenService.delete(nim);
  }
}
