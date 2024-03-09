import { IsNumber, IsString } from 'class-validator';
export class KelasDto {
  @IsString({ message: 'Nama kelas harus ada' })
  nama: string;

  @IsNumber({}, { message: 'Angkatan tahun harus ada' })
  angkatan: number;

  @IsString({ message: 'Prodi harus ada' })
  prodiKode: string;
}
