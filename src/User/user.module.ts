import { Module } from '@nestjs/common';
import { UserServise } from './user.servise';
import { UserController } from './user.controller';
import { PrismaServise } from 'src/prisma.servise';

@Module({
  imports: [],
  providers: [UserServise, PrismaServise],
  controllers: [UserController],
  exports: [UserServise],
})
export class UserModule {}
