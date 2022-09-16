import { Message } from '@prisma/client';
import { MessageRepository } from '@carpool/api/messages/repository/data-access';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateMessageCommand } from './message-command.command';
import { MessageInput } from '@carpool/api/messages/entities';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand>
{
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(command: CreateMessageCommand): Promise<Message | null> {
    const { senderId, receiverId, message } = command;

    const messageObj = new MessageInput();
    messageObj.senderId = senderId;
    messageObj.receiverId = receiverId;
    messageObj.message = message;

    return await this.messageRepository.createMessage(messageObj);
  }
}
