import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserServise } from 'src/User/user.servise';
@Injectable()
export class AuthServise {
  constructor(
    private userServise: UserServise,
    private jwtServise: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userServise.findUserByUserName(username);
    if (!user) throw new BadRequestException('User does not exist');
    if (user?.password !== password) throw new UnauthorizedException();

    const tokens = this.getTokens(1, username);
    return tokens;
  }

  async getTokens(id: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: process.env.SUPER_SECRET_KEY,
          expiresIn: '15m',
        },
      ),
      this.jwtServise.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: process.env.SUPER_SECRET_KEY,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
