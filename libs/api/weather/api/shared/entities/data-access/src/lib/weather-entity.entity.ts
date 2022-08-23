import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => Boolean)
  isRaining: boolean;

  @Field(() => Boolean)
  isWindy: boolean;

  @Field()
  windSpeed: string;

  @Field(() => Boolean)
  isSnowing: boolean;

  @Field()
  temperature: string;
}
