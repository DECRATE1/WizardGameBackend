import { Prisma, User } from '@prisma/client';
import { PrismaServise } from '../prisma.servise';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServise {
  constructor(private prisma: PrismaServise) {}

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }
  async findUserByUserName(
    userName: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userName,
    });
  }
}
