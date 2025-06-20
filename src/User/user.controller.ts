import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { UserServise } from './user.servise';

@Controller('user')
export class UserController {
  constructor(private userServise: UserServise) {}

  @Post('create')
  async createUser(@Body() userData: { username: string; password: string }) {
    return this.userServise.createUser(userData);
  }

  @Get('get')
  async getUserById(@Param('id') id: number) {
    return this.userServise.findById(id);
  }
}
