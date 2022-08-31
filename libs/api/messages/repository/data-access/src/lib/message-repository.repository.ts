import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import { MessageInput } from '@carpool/api/messages/entities';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: MessageInput): Promise<Message | null> {
    return this.prisma.message.create({
      data: message,
    });
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    });
  }
}
