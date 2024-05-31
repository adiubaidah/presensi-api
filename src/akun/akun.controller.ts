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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AkunService } from './akun.service';
import { AkunDto, AkunDtoEdit } from './akun.dto';
import { Request } from 'express';

@Controller('akun')
@UseGuards(JwtGuard, RoleGuard)
export class AkunController {
  constructor(private akunService: AkunService) {}

  @Role([RoleEnum.admin])
  @Get()
  async all() {
    return await this.akunService.allAkun();
  }
  @Role([RoleEnum.admin])
  @Get('mahasiswa')
  async mahasiswa(@Query('relation') relation: number) {
    return await this.akunService.mahasiswa(relation);
  }
  @Role([RoleEnum.admin])
  @Get('dosen')
  async dosen(@Query('relation') relation: number) {
    return await this.akunService.dosen(relation);
  }

  @Get('detail-akun')
  @Role([RoleEnum.admin, RoleEnum.dosen, RoleEnum.mahasiswa])
  async find(@Req() req: Request) {
    const user = req['user'];

    return await this.akunService.akunDetail(user.username);
  }
  @Role([RoleEnum.admin])
  @Post()
  async create(@Body() payload: AkunDto) {
    return await this.akunService.createAkun(payload);
  }
  @Role([RoleEnum.admin])
  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() payload: AkunDtoEdit,
  ) {
    return await this.akunService.update(username, payload);
  }
  @Role([RoleEnum.admin])
  @Delete(':username')
  async delete(@Param('username') username: string) {
    return await this.akunService.delete(username);
  }
}
