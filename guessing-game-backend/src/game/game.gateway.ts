import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway()
export class GameGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('create_session')
  async createSession(@MessageBody() { username }, @ConnectedSocket() client: Socket) {
  const session = await this.gameService.createSession(username, client.id);

  client.join(session.id);
  this.server.to(session.id).emit('session_update', session);
}
}
