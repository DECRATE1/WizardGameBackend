import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LobbyServise } from './lobby.service';
import { AccessTokenGuard } from 'src/Auth/guards/accessToken.guard';
import { LobbyDto } from './lobby.dto';

@Controller('lobby')
export class LobbyController {
  constructor(private lobbyServise: LobbyServise) {}

  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createLobby(@Body() lobbyDto: LobbyDto) {
    return await this.lobbyServise.createLobby(lobbyDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('getLobbys')
  async getLobbys() {
    return await this.lobbyServise.getLobbys();
  }
}
