import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthDto } from './auth.dto';
import { AkunService } from 'src/akun/akun.service';

@Injectable()
export class AuthService {
  constructor(private akunService: AkunService) {}
  async login(payload: AuthDto) {
    const user = await this.validateUser(payload);
    return user;
  }

  async validateUser(payload: AuthDto) {
    const user = await this.akunService.findByUsername(payload.username);

    if (user && (await compare(payload.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
