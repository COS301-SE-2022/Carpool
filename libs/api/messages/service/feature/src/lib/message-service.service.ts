import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { Message } from '@carpool/api/messages/entities';
import { GetMessagesQuery } from './queries/message-query.query';
import { CreateMessageCommand } from './commands/message-command.command';

@Injectable()
export class MessageService {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return await this.queryBus.execute(
      new GetMessagesQuery(senderId, receiverId)
    );
  }

  async createMessage(senderId: string, receiverId: string, message: string) {
    return await this.commandBus.execute(
      new CreateMessageCommand(senderId, receiverId, message)
    );
  }
}
