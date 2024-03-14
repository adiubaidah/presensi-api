import { IsString, IsNumber } from 'class-validator';
export class PembelajaranDto {
  @IsString({ message: 'Kelas harus ada' })
  kelasKode: string;

  @IsString({ message: 'Matakuliah harus ada' })
  matakuliahKode: string;

  @IsString({ message: 'Dosen harus ada' })
  dosenNidn: string;

  @IsString({ message: 'Tahun pembelajaran harus ada' })
  tahunPembelajaran: string;

  @IsNumber({}, { message: 'Total jam harus ada' })
  totalJam: number;

  @IsNumber({}, { message: 'Sks harus ada' })
  sks: number;

  @IsNumber({}, { message: 'Semester harus ada' })
  semester: number;
}
