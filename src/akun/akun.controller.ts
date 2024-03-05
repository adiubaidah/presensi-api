import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AkunService } from './akun.service';
import { AkunDto } from './akun.dto';

@Controller('user')
@Role([RoleEnum.admin])
@UseGuards(JwtGuard, RoleGuard)
export class AkunController {
  constructor(private akunService: AkunService) {}

  @Get()
  async all() {
    return await this.akunService.allAkun();
  }

  @Get('dosen')
  async juri() {
    return await this.akunService.dosen();
  }

  @Post()
  async create(@Body() payload: AkunDto) {
    return await this.akunService.createAkun(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.akunService.delete(id);
  }
}
