import { Controller, Post } from '@nestjs/common';
import { AuthServise } from './auth.servise';
@Controller()
export class AuthController {
  constructor(private authServise: AuthServise) {}

  @Post('login')
  async signIn(userData: { username: string; password: string }) {
    return this.authServise.signIn(userData.username, userData.password);
  }
}
