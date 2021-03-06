import { Booking, Trip } from '@carpool/api/trips/entities';
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

  @Field()
  profilePic: string;

  @Field(() => Boolean)
  isDriver: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  isValidated: boolean;

  @Field(() => [Trip])
  tripsCreated: Trip[];

  @Field(() => [Booking])
  bookings: Booking[];
}

@ObjectType()
export class UserLogin {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  token: string;

  @Field()
  verificationCode: string;

  @Field(() => Date)
  expires: Date;
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

@InputType()
export class UserUpdate {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  university: string;

  @Field()
  studentNumber: string;
}
