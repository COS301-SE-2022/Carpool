import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import { MessageInput } from '@carpool/api/messages/entities';
import { Chat } from '@carpool/api/messages/entities';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: MessageInput): Promise<Message | null> {
    return this.prisma.message.create({
      data: {
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

  async getChats(userId: string): Promise<Chat[]> {
    const chats = await this.prisma.message.findMany({
      where: {
        OR: [{ receiverId: userId }, { senderId: userId }],
      },
      select: {
        senderId: true,
        receiverId: true,
        sender: {
          select: {
            name: true,
            surname: true,
          },
        },
        receiver: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });

    let uniqueChats = [];

    chats.map((chat) => {
      const chatObj = new Chat();

      if (chat.senderId === userId) {
        chatObj.userId = chat.receiverId;
        chatObj.name = `${chat.receiver.name} ${chat.receiver.surname}`;
      } else {
        chatObj.userId = chat.senderId;
        chatObj.name = `${chat.sender.name} ${chat.sender.surname}`;
      }

      uniqueChats.push(chatObj);
    });

    uniqueChats = uniqueChats.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.name === value.name && t.userId === value.userId
        )
    );

    return uniqueChats;
  }
}
