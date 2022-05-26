import { TripsRepository } from '@carpool/api/trips/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Trip, Booking, Location } from '@prisma/client';
import {
  FindAllQuery,
  FindByDriverQuery,
  FindByPassengerQuery,
  FindBookingByTripQuery,
  FindTripByIdQuery,
  FindCoordinatesByTripQuery,
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

@QueryHandler(FindCoordinatesByTripQuery)
export class FindCoordinatesByTripHandler
  implements IQueryHandler<FindCoordinatesByTripQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindCoordinatesByTripQuery): Promise<Location[] | null> {
    return await this.tripsRepository.findCoordinatesByTrip(query.tripId);
  }
}

@QueryHandler(FindTripByIdQuery)
export class FindTripByIdHandler implements IQueryHandler<FindTripByIdQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindTripByIdQuery): Promise<Trip | null> {
    return await this.tripsRepository.findTripById(query.tripId);
  }
}
