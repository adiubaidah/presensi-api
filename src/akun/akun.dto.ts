import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from '@prisma/client';
export class AkunDto {
  @IsString({ message: 'Username tidak valid' })
  @Length(10, 10, { message: 'Username harus 10 karakter' })
  username: string;

  @IsString({ message: 'Password harus ada' })
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.mahasiswa;
}

export class AkunDtoEdit {
  @IsString({ message: 'Username tidak valid' })
  @Length(10, 10, { message: 'Username harus 10 karakter' })
  username: string;

  @IsOptional()
  @IsString({ message: 'Password harus ada' })
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.mahasiswa;
}
