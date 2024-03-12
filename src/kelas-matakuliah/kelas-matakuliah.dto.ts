import { IsString, IsNumber } from 'class-validator';
export class KelasMatakuliahDto {
  @IsString({ message: 'Kelas harus ada' })
  kelasKode: string;

  @IsString({ message: 'Matakuliah harus ada' })
  matakuliahKode: string;
  @IsString({ message: 'Tahun pembelajaran harus ada' })
  tahunPembelajaran: string;

  @IsNumber({}, { message: 'Total jam harus ada' })
  totalJam: number;

  @IsNumber({}, { message: 'Semester harus ada' })
  semester: number;
}
