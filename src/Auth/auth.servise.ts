import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserServise } from 'src/User/user.servise';
import { AuthDto, CreateUserDto } from './auth.dto';
@Injectable()
export class AuthServise {
  constructor(
    private userServise: UserServise,
    private jwtServise: JwtService,
  ) {}

  async signIn(authData: AuthDto) {
    const user = await this.userServise.findUserByUserName(authData.username);
    if (!user) throw new BadRequestException('User does not exist');
    if (user?.password !== authData.password) throw new UnauthorizedException();

    const tokens = this.getTokens(user.id, authData.username);
    return tokens;
  }

  async signUp(createUserDto: CreateUserDto) {
    const userIsExist = await this.userServise.findUserByUserName(
      createUserDto.username,
    );
    if (userIsExist) throw new BadRequestException('User already exist');

    const newUser = await this.userServise.createUser(createUserDto);

    const tokens = this.getTokens(newUser.id, newUser.username);
    await this.userServise.addRefreshToken(
      (await tokens).refreshToken,
      newUser.id,
    );
    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userServise.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches =
      refreshToken === user.refreshToken ? true : false;

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
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
          expiresIn: '60m',
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
