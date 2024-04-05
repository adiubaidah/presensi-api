import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { PertemuanService } from './pertemuan.service';
import { PertemuanDto } from './pertemuan.dto';

@Controller('pertemuan')
export class PertemuanController {
  constructor(private pertemuanService: PertemuanService) {}

  @Role([RoleEnum.dosen])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: PertemuanDto) {
    return await this.pertemuanService.create(payload);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Query('pembelajaran') pembelajaran: number) {
    if (pembelajaran) {
      return await this.pertemuanService.all(pembelajaran);
    }
    throw new BadRequestException('Request tidak valid');
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.pertemuanService.find(id);
  }

  @Role([RoleEnum.dosen, RoleEnum.admin])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: PertemuanDto) {
    return await this.pertemuanService.update(id, payload);
  }
}
