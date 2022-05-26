import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Booking } from './booking-entity.entity';

@ObjectType()
export class PickupLocation {
  @Field(() => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  bookingId: string;

  @Field(() => Booking)
  booking: Booking;
}

@InputType()
export class PickupLocationInput {
  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  bookingId: string;
}
