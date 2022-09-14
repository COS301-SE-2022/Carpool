import { TripsRepository } from '@carpool/api/trips/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Trip, Booking, Location, Driver } from '@prisma/client';
import {
  FindAllQuery,
  FindByDriverQuery,
  FindByPassengerQuery,
  FindBookingByTripQuery,
  FindTripByIdQuery,
  FindCoordinatesByTripQuery,
  SearchTripsQuery,
  findByConfirmedTripsQuery,
  findByRequestedTripsQuery,
  FindBookingByTripAndUserIdQuery,
  FindAllTripRequestsQuery,
  FindUpcomingTripsQuery,
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
    return await this.tripsRepository.findByPassenger(query.passengerId);
  }
}

@QueryHandler(findByConfirmedTripsQuery)
export class FindByConfirmedTripHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindByPassengerQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByConfirmedTrips(query.passengerId);
  }
}

@QueryHandler(findByRequestedTripsQuery)
export class FindByRequestedTripHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindByPassengerQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByRequestedTrips(query.passengerId);
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

@QueryHandler(FindBookingByTripAndUserIdQuery)
export class FindBookingByTripAndUserIdHandler
  implements IQueryHandler<FindBookingByTripAndUserIdQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindBookingByTripAndUserIdQuery): Promise<Booking> {
    return await this.tripsRepository.findBookingByTripAndUserId(
      query.tripId,
      query.userId
    );
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
@QueryHandler(SearchTripsQuery)
export class SearchTripsHandler implements IQueryHandler<SearchTripsQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: SearchTripsQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.searchTrips(query.date);
  }
}
@QueryHandler(FindAllTripRequestsQuery)
export class FindAllTripRequestsHandler
  implements IQueryHandler<FindAllTripRequestsQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindAllTripRequestsQuery): Promise<Booking[] | null> {
    return await this.tripsRepository.findAllTripRequests(query.userId);
  }
}

@QueryHandler(FindUpcomingTripsQuery)
export class FindUpcomingTripsHandler
  implements IQueryHandler<FindUpcomingTripsQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindUpcomingTripsQuery): Promise<Trip | null> {
    return await this.tripsRepository.findUpcomingTrip(query.userId);
  }
}
