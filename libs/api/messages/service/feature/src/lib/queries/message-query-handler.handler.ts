import { Message } from '@prisma/client';
import { Chat } from '@carpool/api/messages/entities';
import { MessageRepository } from '@carpool/api/messages/repository/data-access';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMessagesQuery, GetChatsQuery } from './message-query.query';

@QueryHandler(GetMessagesQuery)
export class GetMessagesHandler implements IQueryHandler<GetMessagesQuery> {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(query: GetMessagesQuery): Promise<Message[]> {
    return await this.messageRepository.getMessages(
      query.senderId,
      query.receiverId
    );
  }
}

@QueryHandler(GetChatsQuery)
export class GetChatsHandler implements IQueryHandler<GetChatsQuery> {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(query: GetChatsQuery): Promise<Chat[]> {
    return await this.messageRepository.getChats(query.userId);
  }
}
