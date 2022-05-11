import { ObjectType, ID, Field, Int, Float } from '@nestjs/graphql';
import { Trip } from './trip-entity.entity';
import { User } from '@carpool/api/authentication/entities';

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

  @Field(() => Trip)
  trip: Trip;
}
