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
  InternalServerErrorException,
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
  async all(
    @Query('dosen') dosen: boolean,
    @Query('mahasiswa') mahasiswa: boolean,
  ) {
    try {
      const results = [];

      // results.push(await this.akunService.)
      if (dosen) {
        results.push(await this.akunService.dosen());
      }

      if (mahasiswa) {
        results.push(await this.akunService.mahasiswa());
      }

      if (!dosen && !mahasiswa) {
        results.push(await this.akunService.allAkun());
      }

      return _.shuffle(_.flatten(results));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
