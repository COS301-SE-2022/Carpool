import { Booking, Trip } from '@carpool/api/trips/entities';
import { Field, ObjectType, ID, InputType, Float } from '@nestjs/graphql';

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

  @Field()
  cellNumber: string;

  @Field(() => Float)
  avgRating: number;

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

  @Field(() => Boolean)
  isDriver: boolean;

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
  cellNumber: string;

  @Field()
  university: string;

  @Field()
  studentNumber: string;
}

@InputType()
export class DriverInput {
  @Field()
  userId: string;

  @Field()
  ID: string;

  @Field()
  licensePlate: string;

  @Field()
  carModel: string;
}

@ObjectType()
export class Driver {
  @Field()
  userId: string;

  @Field()
  idNumber: string;

  @Field()
  license: string;

  @Field()
  licensePlate: string;

  @Field()
  model: string;

  @Field()
  carPicture: string;

  @Field(() => User)
  user: User;
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
  cellNumber: string;

  @Field()
  email: string;

  @Field()
  university: string;

  @Field()
  studentNumber: string;
}
