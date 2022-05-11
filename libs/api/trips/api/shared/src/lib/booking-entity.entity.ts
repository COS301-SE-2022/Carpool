import { ObjectType, ID, Field, Int, Float } from '@nestjs/graphql';
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

  @Field(() => User)
  user: User;

  @Field(() => Trip)
  trip: Trip;
}
