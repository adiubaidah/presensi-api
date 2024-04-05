import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import _ from 'underscore';
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AkunService } from './akun.service';
import { AkunDto, AkunDtoEdit } from './akun.dto';

@Controller('akun')
@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
export class AkunController {
  constructor(private akunService: AkunService) {}

  @Get()
  async all() {
    return await this.akunService.allAkun();
  }

  @Get('mahasiswa')
  async mahasiswa() {
    return await this.akunService.mahasiswa();
  }
  @Get('dosen')
  async dosen() {
    return await this.akunService.dosen();
  }

  @Post()
  async create(@Body() payload: AkunDto) {
    return await this.akunService.createAkun(payload);
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() payload: AkunDtoEdit,
  ) {
    return await this.akunService.update(username, payload);
  }

  @Delete(':username')
  async delete(@Param('username') username: string) {
    return await this.akunService.delete(username);
  }
}
