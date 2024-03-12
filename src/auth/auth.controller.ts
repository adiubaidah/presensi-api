import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JWT_EXPIRE, JWT_SECRET_KEY } from 'src/constant';
import { AuthDto } from './auth.dto';
import { AkunDto } from 'src/akun/akun.dto';
import { AuthService } from './auth.service';
import { AkunService } from 'src/akun/akun.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private akunService: AkunService,
  ) {}
  @Post('register')
  async registerUser(@Body() payload: AkunDto) {
    return await this.akunService.createAkun(payload);
  }
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.login(dto);
    const token = await this.jwtService.signAsync(user, {
      expiresIn: JWT_EXPIRE,
      secret: JWT_SECRET_KEY,
    });
    res.cookie('access_token', `${process.env.TOKEN_TYPE} ${token}`, {
      domain: process.env.DOMAIN,
      path: '/',
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //untuk produksi
      maxAge: JWT_EXPIRE,
    });
    return {
      statusCode: 200,
      message: 'Login berhasil',
      role: user.role,
    };
  }

  @Post('is-auth')
  async checkIsAuth(
    @Body() body: { token: { name: string; value: string } },
    @Req() req: Request,
  ) {
    const token =
      req.cookies['access_token'] ?? (body.token ? body.token.value : null);
    if (token) {
      const access_token = token.split(' ')[1];
      const user = await this.jwtService.verify(access_token, {
        publicKey: process.env.JWT_SECRET_KEY,
      });
      // console.log(user);
      return { isAuth: true, ...user };
    }
    throw new UnauthorizedException('Belum login');
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      domain: process.env.DOMAIN,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //untuk produksi
    });

    return {
      statusCode: 200,
      message: 'Logout berhasil',
    };
  }
}
