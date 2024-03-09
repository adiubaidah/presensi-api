import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from '@prisma/client';
export class AkunDto {
  @IsNumberString({}, { message: 'Username tidak valid' })
  @Length(10, 10, { message: 'Username harus 10 karakter' })
  username: string;

  @IsString({ message: 'Password harus ada' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.mahasiswa;
}
