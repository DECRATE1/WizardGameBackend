import { Module } from '@nestjs/common';
import { LobbyServise } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { PrismaServise } from 'src/prisma.servise';

@Module({
  imports: [],
  providers: [LobbyServise, PrismaServise],
  controllers: [LobbyController],
  exports: [],
})
export class LobbyModule {}
