import { IsString } from 'class-validator';

export class ProdiDto {
  @IsString({ message: 'Nama Prodi harus ada' })
  nama: string;

  @IsString({ message: 'Kode Prodi harus ada' })
  kode: string;
}
