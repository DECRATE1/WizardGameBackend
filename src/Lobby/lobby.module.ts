import { Module } from '@nestjs/common';
import { LobbyServise } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { PrismaServise } from 'src/prisma.servise';
import { LobbyGateway } from './lobby.gateway';

@Module({
  imports: [],
  providers: [LobbyServise, PrismaServise, LobbyGateway],
  controllers: [LobbyController],
  exports: [],
})
export class LobbyModule {}
