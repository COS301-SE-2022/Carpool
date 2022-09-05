import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import { MessageInput } from '@carpool/api/messages/entities';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: MessageInput): Promise<Message | null> {
    console.log('HIT');

    return this.prisma.message.create({
      data: {
        chatId: '',
        senderId: message.senderId,
        receiverId: message.receiverId,
        message: message.message,
      },
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

  // async getChats(userId: string): Promise<Chat[]> {
  //   return this.prisma.chat.findMany({
  //     where: {
  //       OR: [
  //         {
  //           userOneId: userId,
  //         },
  //         {
  //           userTwoId: userId,
  //         },
  //       ],
  //     },
  //   });
  // }
}
