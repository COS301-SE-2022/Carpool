import { Module } from '@nestjs/common';
import { TripsRepository } from '@carpool/api/trips/repository';
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
  FindUpcomingTripsHandler,
  SearchTripsHandler,
  FindByConfirmedTripHandler,
  FindByRequestedTripHandler,
  BookingUpdatePaymentStatusHandler,
  FindBookingByTripAndUserIdHandler,
  AcceptTripRequestHandler,
  StartTripHandler,
  EndTripHandler,
  DeclineTripRequestHandler,
  FindByPassengerReviewsHandler,
  FindByDriverReviewsHandler,
  UpdatePassengerReviewsHandler,
  UpdateDriverReviewsHandler,
  CreateReviewHandler,
  FindAllPassengersHandler,
  FindTripsForMonthHandler,
  TripsService,
  FindBookingsForMonthHandler,
  FindTripsByMonthHandler,
} from '@carpool/api/trips/service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@carpool/api/prisma';
import { AuthService } from '@carpool/api/authentication/service';

@Module({
  imports: [CqrsModule],
  providers: [
    //** RESOLVER */
    TripsResolver,
    //** REPOSITORY */
    TripsRepository,
    //** SERVICES */
    TripsService,
    PrismaService,
    //** COMMAND HANDLERS */
    FindAllHandler,
    FindBookingsForMonthHandler,
    FindTripsForMonthHandler,
    FindUpcomingTripsHandler,
    FindTripsByMonthHandler,
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
    FindByConfirmedTripHandler,
    FindByRequestedTripHandler,
    BookingUpdatePaymentStatusHandler,
    FindBookingByTripAndUserIdHandler,
    AcceptTripRequestHandler,
    StartTripHandler,
    EndTripHandler,
    DeclineTripRequestHandler,
    FindByPassengerReviewsHandler,
    FindByDriverReviewsHandler,
    UpdatePassengerReviewsHandler,
    UpdateDriverReviewsHandler,
    CreateReviewHandler,
    FindAllPassengersHandler,
  ],
})
export class TripsModule {}
