import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@carpool/api/authentication/resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TripsModule } from '@carpool/api/trips/resolvers';
import { BookingsModule } from '@carpool/api/bookings/resolvers';
import { WeatherModule } from '@carpool/api/weather/api/feature';
import { MessageModule } from '@carpool/api/messages/api/feature';
import { DriversModule } from '@carpool/api/drivers/api/feature';

@Module({
  imports: [
    AuthenticationModule,
    WeatherModule,
    DriversModule,
    TripsModule,
    BookingsModule,
    MessageModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // playground: true,
      // introspection: true,
      uploads: false,
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
  ],
})
export class ApiShellFeatureModule {}
