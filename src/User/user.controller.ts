import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserServise } from './user.servise';
import { AccessTokenGuard } from 'src/Auth/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private userServise: UserServise) {}

  @Post('create')
  async createUser(@Body() userData: { username: string; password: string }) {
    return this.userServise.createUser(userData);
  }

  @Get('getById')
  async getUserById(@Param('id') id: number) {
    return this.userServise.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('getByUsername')
  async getUserByUserName(@Param('username') username: string) {
    console.log(username);
    return this.userServise.findUserByUserName(username);
  }
}
