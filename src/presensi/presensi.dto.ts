import { IsEnum } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdatePresensiDto {
  @IsEnum($Enums.JenisAbsensi, { message: 'Jenis absensi tidak valid' })
  jenis: $Enums.JenisAbsensi;
}
