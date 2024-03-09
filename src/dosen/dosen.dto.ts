import { IsEmail, IsString, Length, IsEnum, IsOptional } from 'class-validator';
import { Kelamin } from '@prisma/client';
export class DosenDto {
  @Length(10)
  @IsString({ message: 'Nim tidak valid' })
  nidn: string;
  @IsString({ message: 'Nama tidak valid' })
  nama: string;
  @IsEmail({}, { message: 'Email tidak valid' })
  email: string;

  @IsEnum(Kelamin)
  kelamin: Kelamin;

  @IsOptional()
  @IsString({ message: 'Mahasiswa harus memiliki username' })
  akunUsername: string;
}
