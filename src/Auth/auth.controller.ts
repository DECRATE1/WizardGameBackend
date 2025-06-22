import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthServise } from './auth.servise';

import { CreateUserDto } from './auth.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthServise) {}

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
    console.log(userId);
    const refresToken = req.headers.authorization
      ?.split('Bearer')[1]
      .trim() as string;

    return this.authServise.refreshTokens(+userId, refresToken);
  }
}
