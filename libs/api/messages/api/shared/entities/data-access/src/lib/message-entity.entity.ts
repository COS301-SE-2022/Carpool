import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  message: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class MessageInput {
  @Field()
  message: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;
}
