import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@carpool/api/authentication/resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    AuthenticationModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
})
export class ApiShellFeatureModule {}
