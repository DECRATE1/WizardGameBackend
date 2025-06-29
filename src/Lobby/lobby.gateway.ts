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
    data: { userid: number; lobbyid: number; removeElement: string },
  ) {
    await this.lobbyServise.removePlayerFromLobby(+data.userid);
    client.disconnect();
    await this.server
      .in(data.lobbyid.toString())
      .fetchSockets()
      .then((socket: any) => {
        this.server.to(data.lobbyid.toString()).emit('NumberOfPlayers', {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          numberOfConnections: socket.length,
          removeElement: data.removeElement,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
          socketids: socket.map((client) => client.id),
        });
      });
  }

  @SubscribeMessage('ready')
  async handleTest(client: Socket, data: { userid: number; lobbyid: number }) {
    const clientReadyState = await this.lobbyServise.updateReadyState(
      +data.userid,
    );

    this.server.to(data.lobbyid.toString()).emit('readyState', {
      state: clientReadyState[0].playerisReady,
      sockeid: client.id,
    });
  }

  @SubscribeMessage('connectLobby')
  async handleConnectionToLobby(
    client: Socket,
    data: { userid: number; lobbyid: number; client: Socket },
  ) {
    const lobbyId = data.lobbyid.toString();
    await client.join(lobbyId);
    const sockets = await this.server.in(lobbyId).fetchSockets();

    this.server.to(lobbyId).emit('NumberOfPlayers', {
      numberOfConnections: sockets.length,
      socketids: sockets.map((socket) => socket.id),
    });

    await this.lobbyServise.addPlayerToLobby(+data.userid, +data.lobbyid);
  }
}
