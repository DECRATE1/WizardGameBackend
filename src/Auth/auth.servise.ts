import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserServise } from 'src/User/user.servise';
@Injectable()
export class AuthServise {
  constructor(
    private userServise: UserServise,
    private jwtServise: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userServise.findUserByUserName({ username });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtServise.signAsync(payload),
    };
  }
}
