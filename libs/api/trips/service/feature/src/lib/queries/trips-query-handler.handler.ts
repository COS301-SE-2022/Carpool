import { TripsRepository } from '@carpool/api/trips/repository/data-access';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Trip, Booking } from '@prisma/client';
import {
  FindAllQuery,
  FindByDriverQuery,
  FindByPassengerQuery,
  FindBookingByTripQuery,
} from './trips-query.query';

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(): Promise<Trip[] | null> {
    return await this.tripsRepository.findAll();
  }
}

@QueryHandler(FindByDriverQuery)
export class FindByDriverHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindByDriverQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByDriver(query.driverId);
  }
}

@QueryHandler(FindByPassengerQuery)
export class FindByPassengerHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindByPassengerQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByDriver(query.passengerId);
  }
}

@QueryHandler(FindBookingByTripQuery)
export class FindBookingByTripHandler
  implements IQueryHandler<FindBookingByTripQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindBookingByTripQuery): Promise<Booking[] | null> {
    return await this.tripsRepository.findBookingByTrip(query.tripId);
  }
}
