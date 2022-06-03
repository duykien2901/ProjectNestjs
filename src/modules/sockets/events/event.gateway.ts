import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class EventGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  protected logger: Logger;
  constructor() {
    this.logger = new Logger('Message gateway');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-room')
  public joinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedroom', room);
  }

  @SubscribeMessage('leave-room')
  public leaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leavedroom', room);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
