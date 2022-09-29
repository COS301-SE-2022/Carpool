import { ObjectType, Field, Int, InputType, ID } from '@nestjs/graphql';


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

  @Field()
  rating: string;


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

  @Field()
  rating: string;

}
