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

  async addPlayerToLobby(userid: number, lobbyid: number) {
    return await this.prisma.lobbyuser.create({
      data: { userid, lobbyid },
    });
  }

  removePlayerFromLobby(userid: number) {
    return this.prisma.lobbyuser.deleteMany({ where: { userid } });
  }

  getPlayers(lobbyid: number) {
    return this.prisma.lobbyuser.findMany({ where: { lobbyid } });
  }

  async updateReadyState(userid: number) {
    const readyState = await this.prisma.lobbyuser
      .findFirst({
        where: { userid },
        select: { playerisReady: true },
      })
      .then((state) => state?.playerisReady);

    return this.prisma.lobbyuser.updateManyAndReturn({
      where: { userid },
      data: { playerisReady: { set: !readyState } },
      select: { playerisReady: true },
    });
  }
}
