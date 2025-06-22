import { Prisma, User } from '@prisma/client';
import { PrismaServise } from '../prisma.servise';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServise {
  constructor(private prisma: PrismaServise) {}

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByUserName(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async addRefreshToken(refreshToken: string, id: number) {
    return this.prisma.user.update({ where: { id }, data: { refreshToken } });
  }
}
