import { ObjectType, Field, Int, InputType, ID, Float } from '@nestjs/graphql';


@ObjectType()
export class Reviews {
  @Field(() => ID)
  id: string;

  @Field()
  byId: string;

  @Field()
  forId: string;

  @Field()
  tripId: string;

  @Field()
  role: string;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;



}

@InputType()
export class ReviewInput {
  @Field()
  byId: string;

  @Field()
  forId: string;

  @Field()
  tripId: string;

  @Field()
  role: string;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;
}

@InputType()
export class AverageRatingUpdate {
  @Field()
  forid: string;

  @Field(() => Float)
  avgRating: number;
}
