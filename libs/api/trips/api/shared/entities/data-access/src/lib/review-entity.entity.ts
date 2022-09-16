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
  role: Role;

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
  role: Role;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;

}

enum Role {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER'
}
