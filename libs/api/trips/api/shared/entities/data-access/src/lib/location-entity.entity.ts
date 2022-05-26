import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Trip } from './trip-entity.entity';

@ObjectType()
export class Location {
  @Field(() => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  tripId: string;

  @Field(() => Trip)
  trip: Trip;
}

@InputType()
export class LocationInput {
  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;
}
