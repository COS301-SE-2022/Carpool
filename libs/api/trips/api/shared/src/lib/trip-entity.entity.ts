import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';
import { Booking } from './booking-entity.entity';

@ObjectType()
export class Trip {
  @Field(() => ID)
  tripId: string;

  @Field()
  userId: string;

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

  @Field(() => User)
  driver: User;

  @Field(() => [Booking])
  passengers: Booking[];
}
