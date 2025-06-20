import { Body, Controller, Post, Request } from '@nestjs/common';
import { UserServise } from './user.servise';

@Controller('user')
export class UserController {
  constructor(private userServise: UserServise) {}

  @Post('create')
  async createUser(@Body() userData: { username: string; password: string }) {
    const userIsExist = await this.userServise.findUserByUserName({
      username: userData.username,
    });

    if (userIsExist) {
      return 'user is already exist';
    }

    await this.userServise.createUser(userData);
    return 'user created succesfully';
  }
}
