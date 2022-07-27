import { ObjectType, ID, Field, Int, Float, InputType } from '@nestjs/graphql';
import { PickupLocation } from './pickuplocation-entity.entity';
import { User } from '@carpool/api/authentication/entities';
import { Trip } from './trip-entity.entity';

@ObjectType()
export class Booking {
  @Field(() => ID)
  bookingId: string;

  @Field()
  userId: string;

  @Field()
  tripId: string;

  @Field(() => Date)
  bookingDate: Date;

  @Field(() => Int)
  seatsBooked: number;

  @Field()
  status: string;

  @Field(() => Float)
  price: number;

  @Field(() => PickupLocation)
  pickUp: PickupLocation;

  @Field(() => User)
  user: User;

  @Field(() => Trip)
  trip: Trip;
}

@InputType()
export class BookingInput {
  @Field()
  userId: string;

  @Field()
  tripId: string;

  @Field()
  bookingDate: string;

  @Field()
  seatsBooked: string;

  @Field()
  status: string;

  @Field()
  price: string;
}

@InputType()
export class BookingStatusUpdate {
  @Field(() => ID)
  bookingId: string;

  @Field()
  status: string;
}
