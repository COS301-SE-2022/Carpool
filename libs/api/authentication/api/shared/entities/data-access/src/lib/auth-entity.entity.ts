import { Booking, Trip } from '@carpool/api/trips/entities';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Stream } from 'stream';

@ObjectType()
export class AdminUser {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class Upload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream)
  createReadStream: Stream;
}

@ObjectType()
export class AdminUserReturn {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  surname: string;
}

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

  @Field(() => Number)
  avgRating: number;

  @Field()
  cellNumber: string;

  @Field(() => Boolean)
  isValidated: boolean;

  @Field(() => [Trip])
  tripsCreated: Trip[];

  @Field(() => [Booking])
  bookings: Booking[];
}

@ObjectType()
export class Count {
  @Field()
  university: number;
}

@ObjectType()
export class TopUniversities {
  @Field()
  university: string;

  @Field(() => Count)
  _count: Count;
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

@ObjectType()
export class ForgotPassword {
  @Field()
  email: string;

  @Field()
  verificationCode: string;

  @Field(() => Date)
  expires: Date;
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
