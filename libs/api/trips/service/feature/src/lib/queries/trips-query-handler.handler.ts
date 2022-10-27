import { TripsRepository } from '@carpool/api/trips/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Trip, Booking, Location, Driver, Notification } from '@prisma/client';
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
  findByPassengerReviewsQuery,
  findByDriverReviewsQuery,
  findAllPassengersQuery,
  FindBookingsForMonthQuery,
  FindTripsForMonthQuery,
  FindTripsByMonthQuery,
  FindBookingsByUserQuery,
  FindAllNotificationsQuery,
  FindBookingByIdQuery,
  FindByDriverForDashboardQuery,
  FindTripByBookingQuery,
} from './trips-query.query';
import { BookingRequest, TripByMonth } from '@carpool/api/trips/entities';

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

@QueryHandler(FindByDriverForDashboardQuery)
export class FindByDriverForDashboardHandler
  implements IQueryHandler<FindAllQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindByDriverForDashboardQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByDriverForDashboard(query.driverId);
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

@QueryHandler(findByPassengerReviewsQuery)
export class FindByPassengerReviewsHandler
  implements IQueryHandler<FindAllQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: findByPassengerReviewsQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByPassengerReviews(query.passengerId);
  }
}

@QueryHandler(findAllPassengersQuery)
export class FindAllPassengersHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: findAllPassengersQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findAllPassengers(query.tripID);
  }
}

@QueryHandler(findByDriverReviewsQuery)
export class FindByDriverReviewsHandler implements IQueryHandler<FindAllQuery> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: findByDriverReviewsQuery): Promise<Trip[] | null> {
    return await this.tripsRepository.findByDriverReviews(query.DriverId);
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

@QueryHandler(FindTripByBookingQuery)
export class FindTripByBookingHandler
  implements IQueryHandler<FindTripByBookingQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindTripByBookingQuery): Promise<BookingRequest | null> {
    return await this.tripsRepository.findTripByBooking(query.bookingId);
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

@QueryHandler(FindTripsForMonthQuery)
export class FindTripsForMonthHandler
  implements IQueryHandler<FindTripsForMonthQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindTripsForMonthQuery): Promise<number> {
    return await this.tripsRepository.findTripsForMonth();
  }
}
@QueryHandler(FindBookingsForMonthQuery)
export class FindBookingsForMonthHandler
  implements IQueryHandler<FindBookingsForMonthQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindBookingsForMonthQuery): Promise<number> {
    return await this.tripsRepository.findBookingsForMonth();
  }
}

@QueryHandler(FindTripsByMonthQuery)
export class FindTripsByMonthHandler
  implements IQueryHandler<FindTripsByMonthQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindTripsByMonthQuery): Promise<TripByMonth[]> {
    return await this.tripsRepository.findTripsByMonth();
  }
}

@QueryHandler(FindBookingsByUserQuery)
export class FindBookingsByUserHandler
  implements IQueryHandler<FindBookingsByUserQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindBookingsByUserQuery): Promise<Booking[]> {
    return await this.tripsRepository.findBookingsByUser(query.userId);
  }
}

@QueryHandler(FindAllNotificationsQuery)
export class FindALlNotificationsHandler
  implements IQueryHandler<FindAllNotificationsQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindAllNotificationsQuery): Promise<Notification[]> {
    return await this.tripsRepository.findAllNotifications(query.userId);
  }
}

@QueryHandler(FindBookingByIdQuery)
export class FindBookingByIdHandler
  implements IQueryHandler<FindBookingByIdQuery>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(query: FindBookingByIdQuery): Promise<Booking> {
    return await this.tripsRepository.findBookingById(query.bookingId);
  }
}
