import { IsEnum, IsString } from 'class-validator';
import { Role } from '@prisma/client';
export class AkunDto {
  @IsString({ message: 'Username harus ada' })
  username: string;

  @IsString({ message: 'Password harus ada' })
  password: string;

  @IsEnum(Role)
  role: Role;
}
