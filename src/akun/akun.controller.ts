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
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AkunService } from './akun.service';
import { AkunDto } from './akun.dto';

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
      const results = await Promise.all([
        dosen ? this.akunService.dosen() : undefined,
        mahasiswa ? this.akunService.mahasiswa() : undefined,
      ]);

      return {
        dosen: results[0] || [],
        mahasiswa: results[1] || [],
      };
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
    @Query('role') role: RoleEnum,
  ) {
    return await this.akunService.changeRole(username, role);
  }

  @Delete(':username')
  async delete(@Param('username') username: string) {
    return await this.akunService.delete(username);
  }
}
