import { IsString } from 'class-validator';
export class AuthDto {
  @IsString({ message: 'Username harus ada' })
  username: string;

  @IsString({ message: 'Password harus ada' })
  password: string;
}
