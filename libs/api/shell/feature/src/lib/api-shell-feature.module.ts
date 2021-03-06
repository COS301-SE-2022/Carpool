import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@carpool/api/authentication/resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TripsModule } from '@carpool/api/trips/resolvers';
import { BookingsModule } from '@carpool/api/bookings/resolvers';

@Module({
  imports: [
    AuthenticationModule,
    TripsModule,
    BookingsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
})
export class ApiShellFeatureModule {}
