import { Injectable } from '@nestjs/common';
import { PrismaServise } from 'src/prisma.servise';
import { LobbyDto } from './lobby.dto';

@Injectable()
export class LobbyServise {
  constructor(private prisma: PrismaServise) {}

  createLobby(lobbyDto: LobbyDto) {
    return this.prisma.lobby.create({
      data: { id: lobbyDto.id, lobbytitle: lobbyDto.title },
    });
  }

  getLobbys() {
    return this.prisma.lobby.findMany();
  }

  getLobbyById(id: number) {
    return this.prisma.lobby.findFirst({ where: { id } });
  }

  deleteLobby(id: number) {
    return this.prisma.lobby.delete({ where: { id } });
  }
}
