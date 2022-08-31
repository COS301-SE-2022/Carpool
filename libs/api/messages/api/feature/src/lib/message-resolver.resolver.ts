import { MessageService } from '@carpool/api/messages/service/feature';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { Message } from '@carpool/api/messages/entities';
import { User } from '@carpool/api/authentication/entities';
import { AuthService } from '@carpool/api/authentication/service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {}

  @ResolveField(() => User)
  async sender(@Root() message: Message): Promise<User> {
    return await this.authService.findUserById(message.senderId);
  }

  @ResolveField(() => User)
  async receiver(@Root() message: Message): Promise<User> {
    return await this.authService.findUserById(message.senderId);
  }

  @Query(() => [Message])
  async getMessages(
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string
  ): Promise<Message[]> {
    return await this.messageService.getMessages(senderId, receiverId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('message') message: string,
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string
  ): Promise<Message> {
    return await this.messageService.createMessage(
      senderId,
      receiverId,
      message
    );
  }
}
