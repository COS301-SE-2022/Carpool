import { Module } from '@nestjs/common';
import { TripsRepository } from '@carpool/api/trips/repository';
import { TripsService } from '@carpool/api/trips/service';
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
  FindCoordinatesByTripHandler,
  FindBookingByTripHandler,
  SearchTripsHandler,
} from '@carpool/api/trips/service';
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
    SearchTripsHandler,
    BookTripHandler,
    FindBookingByTripHandler,
    TripsDeleteHandler,
    TripsUpdateHandler,
    FindCoordinatesByTripHandler,
    FindTripByIdHandler,
    AuthService,
  ],
})
export class TripsModule {}
