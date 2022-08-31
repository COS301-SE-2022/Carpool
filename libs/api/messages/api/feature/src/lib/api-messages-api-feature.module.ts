import { Module } from '@nestjs/common';
import { MessageRepository } from '@carpool/api/messages/repository/data-access';
import {
  MessageService,
  CreateMessageHandler,
  GetMessagesHandler,
} from '@carpool/api/messages/service/feature';
import { MessageResolver } from './message-resolver.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { AuthService } from '@carpool/api/authentication/service';

@Module({
  imports: [CqrsModule],
  providers: [
    MessageResolver,
    MessageService,
    CreateMessageHandler,
    GetMessagesHandler,
    PrismaService,
    AuthService,
    MessageRepository,
  ],
})
export class MessageModule {}
