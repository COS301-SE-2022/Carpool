import { Field, ObjectType, ID, Int, Float, InputType } from '@nestjs/graphql';
import { User } from '@carpool/api/authentication/entities';
import { Booking } from './booking-entity.entity';
import { Location, LocationInput } from './location-entity.entity';

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
export class TripCancelUpdate {
  @Field()
  status: string;
}

@InputType()
export class PassengerCancelCommand {
  @Field()
  status: string;

  @Field()
  seatsAvailable: number;
}
