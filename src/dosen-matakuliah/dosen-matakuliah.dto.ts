import { IsString, IsNumber } from 'class-validator';
export class DosenMatakuliahDto {
  @IsString({ message: 'Dosen pengampu harus ada' })
  dosenNidn: string;

  @IsString({ message: 'Matakuliah harus ada' })
  matakuliahKode: string;

  @IsNumber({}, { message: 'Total jam tidak valid' })
  totalJam: number;
}
