import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyServise } from './lobby.service';

@WebSocketGateway(8080, { namespace: '/lobby', cors: { origin: '*' } })
export class LobbyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private lobbyServise: LobbyServise) {}
  @WebSocketServer() server: Server;

  afterInit() {
    console.log(`server is init`);
  }

  async handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
    this.server.send((await this.server.fetchSockets()).length);
  }

  handleDisconnect(client: Socket) {
    console.log(`client is disconnected: ${client.id}`);
  }

  @SubscribeMessage('connect')
  async handleConnectionToLobby(
    @MessageBody() data: { userid: number; lobbyid: number },
  ): Promise<void> {
    await this.lobbyServise.addPlayerToLobby(data.userid, data.lobbyid);
    this.server.emit('drawPlayer');
  }

  @SubscribeMessage('disconnect')
  async handleDisconnectionFromLobby(@MessageBody() data: { userid: number }) {
    await this.lobbyServise.removePlayerFromLobby(data.userid);
  }
}
