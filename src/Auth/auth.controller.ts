import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthServise } from './auth.servise';

import { CreateUserDto } from './auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthServise) {}

  @UseGuards(AccessTokenGuard)
  @Post('signin')
  async signIn(@Body() userData: { username: string; password: string }) {
    return this.authServise.signIn({
      username: userData.username,
      password: userData.password,
    });
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authServise.signUp({
      username: createUserDto.username,
      password: createUserDto.password,
    });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = (req.user as Express.User)['sub'] as number;
    const refresToken = (req.user as Express.User)['refreshToken'] as string;
    return this.authServise.refreshTokens(+userId, refresToken);
  }
}
