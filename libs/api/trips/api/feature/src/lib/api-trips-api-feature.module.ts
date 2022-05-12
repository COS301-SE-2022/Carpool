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
} from '@carpool/api/trips/service/feature';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';

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
  ],
})
export class TripsModule {}
