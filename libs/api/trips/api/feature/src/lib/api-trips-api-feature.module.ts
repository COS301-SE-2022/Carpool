import { Module } from '@nestjs/common';
import { TripsRepository } from '@carpool/api/trips/repository/data-access';
import { TripsService } from '@carpool/api/trips/service/feature';
import { TripsResolver } from './trips-resolver.resolver';
import {
  FindAllHandler,
  FindByDriverHandler,
  FindByPassengerHandler,
  TripsCreateHandler,
  BookTripHandler,
  TripsDeleteHandler,
  TripsUpdateHandler,
  FindTripByIdHandler,
} from '@carpool/api/trips/service/feature';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { AuthService } from '@carpool/api/authentication/service';

@Module({
  imports: [CqrsModule],
  providers: [
    TripsResolver,
    TripsRepository,
    TripsService,
    PrismaService,
    FindAllHandler,
    FindByDriverHandler,
    FindByPassengerHandler,
    TripsCreateHandler,
    BookTripHandler,
    TripsDeleteHandler,
    TripsUpdateHandler,
    FindTripByIdHandler,
    AuthService,
  ],
})
export class TripsModule {}
