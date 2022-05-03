import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  university: string;

  @Field()
  studentNumber: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  university: string;

  @Field()
  studentNumber: string;
}
