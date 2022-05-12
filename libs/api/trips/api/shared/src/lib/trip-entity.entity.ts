import { Field, ObjectType, ID, Int, Float, InputType } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';
import { Booking } from './booking-entity.entity';

@ObjectType()
export class Trip {
  @Field(() => ID)
  tripId: string;

  @Field()
  driverId: string;

  @Field(() => Date)
  tripDate: Date;

  @Field(() => Int)
  seatsAvailable: number;

  @Field(() => Float)
  price: number;

  @Field()
  startLocation: string;

  @Field()
  destination: string;

  @Field()
  category: string;

  @Field()
  status: string;

  @Field(() => Booking)
  passengers: Booking[];

  @Field(() => User)
  driver: User;
}

@InputType()
export class TripsInput {
  @Field(() => Date)
  tripDate: Date;

  @Field()
  driverId: string;

  @Field()
  seatsAvailable: number;

  @Field()
  price: number;

  @Field()
  startLocation: string;

  @Field()
  destination: string;

  @Field()
  category: string;

  @Field()
  status: string;
}

@InputType()
export class TripsUpdate {
  @Field()
  seatsAvailable: number;

  @Field()
  price: number;

  @Field()
  status: string;
}
