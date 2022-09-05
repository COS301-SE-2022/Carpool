import { MessageService } from '@carpool/api/messages/service/feature';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Root,
  Subscription,
} from '@nestjs/graphql';
import { Message } from '@carpool/api/messages/entities';
import { User } from '@carpool/api/authentication/entities';
import { AuthService } from '@carpool/api/authentication/service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

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
    return await this.authService.findUserById(message.receiverId);
  }

  @Query(() => [Message])
  async getMessages(
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string
  ): Promise<Message[]> {
    return await this.messageService.getMessages(senderId, receiverId);
  }

  @Query(() => [Message])
  async getChats(@Args('userId') userId: string): Promise<Message[]> {
    return await this.messageService.getChats(userId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('message') message: string,
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string
  ): Promise<Message> {
    const newMessage = await this.messageService.createMessage(
      senderId,
      receiverId,
      message
    );

    pubSub.publish('messageSent', { messageSent: newMessage });

    return newMessage;
  }

  @Subscription(() => Message, { name: 'messageSent' })
  messageSent() {
    return pubSub.asyncIterator('messageSent');
  }
}
