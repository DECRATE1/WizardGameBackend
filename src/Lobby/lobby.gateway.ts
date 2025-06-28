import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyServise } from './lobby.service';

@WebSocketGateway(8080, { namespace: '/lobby', cors: { origin: '*' } })
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private lobbyServise: LobbyServise) {}
  @WebSocketServer() server: Server;

  afterInit() {
    console.log(`server is init`);
  }

  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('dis')
  async handleCustomDisconnect(
    client: Socket,
    data: { userid: number; lobbyid: number },
  ) {
    await this.lobbyServise.removePlayerFromLobby(+data.userid);
    const numberofPlayers = await this.lobbyServise.getNumberOfPlayersInLobby(
      +data.lobbyid,
    );

    this.server
      .to(data.lobbyid.toString())
      .emit('NumberOfPlayers', numberofPlayers.length);
  }

  @SubscribeMessage('ready')
  async handleTest(client: Socket, data: { userid: number; lobbyid: number }) {
    const clientReadyState = await this.lobbyServise.updateReadyState(
      +data.userid,
    );

    this.server
      .to(data.lobbyid.toString())
      .emit('readyState', { state: clientReadyState[0].playerisReady });
  }

  @SubscribeMessage('connectLobby')
  async handleConnectionToLobby(
    client: Socket,
    data: { userid: number; lobbyid: number; client: Socket },
  ) {
    const lobbyId = data.lobbyid.toString();
    await client.join(lobbyId);
    this.server
      .to(lobbyId)
      .emit(
        'NumberOfPlayers',
        (await this.server.in(lobbyId).fetchSockets()).length,
      );

    await this.lobbyServise.addPlayerToLobby(+data.userid, +data.lobbyid);
  }
}
