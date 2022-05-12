import { ObjectType, ID, Field, Int, Float, InputType } from '@nestjs/graphql';

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
}

@InputType()
export class BookingInput {
  @Field()
  userId: string;

  @Field()
  tripId: string;

  @Field()
  bookingDate: Date;

  @Field()
  seatsBooked: number;

  @Field()
  status: string;

  @Field()
  price: number;
}
