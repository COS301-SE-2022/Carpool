import { Field, ObjectType, ID, Int, Float, InputType } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';
import { Booking } from './booking-entity.entity';
import { Location, LocationInput } from './location-entity.entity';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  entity: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class BookingRequest {
  @Field(() => ID)
  tripId: string;

  @Field()
  bookingId: string;

  @Field()
  passengerId: string;

  @Field(() => Date)
  tripDate: Date;

  @Field()
  passengerName: string;

  @Field()
  passengerPic: string;

  @Field(() => Int)
  passengerRating: number;

  @Field()
  startAddress: string;

  @Field()
  endAddress: string;

  @Field()
  startLat: string;

  @Field()
  startLong: string;

  @Field()
  endLat: string;

  @Field()
  endLong: string;

  @Field()
  pickupAddress: string;

  @Field()
  pickupLat: string;

  @Field()
  pickupLong: string;
}

@ObjectType()
export class Trip {
  @Field(() => ID)
  tripId: string;

  @Field()
  driverId: string;

  @Field(() => Date)
  tripDate: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  seatsAvailable: number;

  @Field(() => Float)
  price: number;

  @Field(() => User)
  driver: User;

  @Field()
  status: string;

  @Field(() => [Booking])
  passengers: Booking[];

  @Field(() => [Location])
  coordinates: Location[];
}

@ObjectType()
export class TripByMonth {
  @Field(() => String)
  month: string;

  @Field(() => Int)
  trips: number;
}

@InputType()
export class TripsInput {
  @Field()
  driverId: string;

  @Field()
  tripDate: string;

  @Field()
  seatsAvailable: string;

  @Field()
  price: string;

  @Field(() => [LocationInput])
  coordinates: LocationInput[];
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

@InputType()
export class AcceptTripRequestUpdate {
  @Field()
  seatsAvailable: number;

  @Field()
  status: string;
}

@InputType()
export class TripStatusUpdate {
  @Field()
  status: string;
}

@InputType()
export class ReviewsStatusUpdate {
  @Field(() => ID)
  tripId: string;
}
