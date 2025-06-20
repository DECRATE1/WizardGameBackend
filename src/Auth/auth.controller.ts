import { Body, Controller, Post } from '@nestjs/common';
import { AuthServise } from './auth.servise';
@Controller('user')
export class AuthController {
  constructor(private authServise: AuthServise) {}

  @Post('login')
  async signIn(@Body() userData: { username: string; password: string }) {
    return this.authServise.signIn(userData.username, userData.password);
  }
}
