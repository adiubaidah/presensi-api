import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class ProdiDto {
  @IsString({ message: 'Nama Prodi harus ada' })
  nama: string;

  @Transform(({ value }) => value.toString().toUpperCase())
  @IsString({ message: 'Kode Prodi harus ada' })
  kode: string;
}
