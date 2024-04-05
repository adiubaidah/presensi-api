import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsDate } from 'class-validator';
export class PertemuanDto {
  @IsNumber({}, { message: 'No pertemuan tidak valid' })
  pertemuanKe: number;

  @IsString({ message: 'Judul Materi harus ada' })
  judulMateri: string;
  @IsString({ message: 'Deskripsi Materi harus ada' })
  deskripsiMateri: string;

  @IsNumber({}, { message: 'Timer absensi harus ada' })
  timerPresensi: number;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Tanggal pertemuan tidak valid' })
  tanggal: Date;

  @IsNumber({}, { message: 'Pembelajaran dibutuhkan' })
  pembelajaranId: number;
}
