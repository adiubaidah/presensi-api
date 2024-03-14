import { IsString } from 'class-validator';
export class MatakuliahDto {
  @IsString({ message: 'Kode matakuliah harus ada' })
  kode: string;

  @IsString({ message: 'Nama Matakuliah harus ada' })
  nama: string;
}
