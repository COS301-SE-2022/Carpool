import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  Booking,
  Trip,
  BookingStatusUpdate,
} from '@carpool/api/trips/entities';
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
} from './queries/trips-query.query';
import { Location } from '@carpool/api/trips/entities';
import {
  TripsCreateCommand,
  TripsUpdateCommand,
  BookTripCommand,
  TripsDeleteCommand,
  AcceptTripRequestCommand,
  StartTripCommand,
  EndTripCommand,
  BookingUpdatePaymentStatusCommand,
  DeclineTripRequestCommand,
} from './commands/trips-command.command';

@Injectable()
export class TripsService {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  async findAll(): Promise<Trip[] | null> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findTripById(tripId: string): Promise<Trip | null> {
    return await this.queryBus.execute(new FindTripByIdQuery(tripId));
  }

  async findByDriver(driverId: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(new FindByDriverQuery(driverId));
  }

  async findByPassenger(passengerId: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(new FindByPassengerQuery(passengerId));
  }

  async findByConfirmedTrips(passengerId: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(
      new findByConfirmedTripsQuery(passengerId)
    );
  }

  async findByRequestedTrips(passengerId: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(
      new findByRequestedTripsQuery(passengerId)
    );
  }

  async findBookingByTrip(tripID: string): Promise<Booking[] | null> {
    return await this.queryBus.execute(new FindBookingByTripQuery(tripID));
  }

  async findBookingByTripAndUserId(
    tripID: string,
    userId: string
  ): Promise<Booking> {
    return await this.queryBus.execute(
      new FindBookingByTripAndUserIdQuery(tripID, userId)
    );
  }

  async findCoordinatesByTrip(tripID: string): Promise<Location[] | null> {
    return await this.queryBus.execute(new FindCoordinatesByTripQuery(tripID));
  }

  async searchTrips(date: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(new SearchTripsQuery(date));
  }

  async create(
    driver: string,
    tripDate: string,
    seatsAvailable: string,
    price: string,
    status: string,
    startLocationAddress: string,
    startLocationLongitude: string,
    startLocationLatitude: string,
    destinationAddress: string,
    destinationLongitude: string,
    destinationLatitude: string
  ): Promise<Trip> {
    return await this.commandBus.execute(
      new TripsCreateCommand(
        driver,
        tripDate,
        seatsAvailable,
        price,
        status,
        startLocationAddress,
        startLocationLongitude,
        startLocationLatitude,
        destinationAddress,
        destinationLongitude,
        destinationLatitude
      )
    );
  }

  async bookTrip(
    passengerId: string,
    tripId: string,
    seatsBooked: string,
    status: string,
    price: string,
    address: string,
    latitude: string,
    longitude: string
  ): Promise<Booking> {
    return await this.commandBus.execute(
      new BookTripCommand(
        tripId,
        passengerId,
        seatsBooked,
        status,
        price,
        address,
        longitude,
        latitude
      )
    );
  }

  async update(
    tripId: string,
    seatsAvailable: number,
    price: number,
    status: string
  ): Promise<Trip> {
    return await this.commandBus.execute(
      new TripsUpdateCommand(tripId, seatsAvailable, price, status)
    );
  }

  async updatePaymentStatus(bookingId: string): Promise<BookingStatusUpdate> {
    return await this.commandBus.execute(
      new BookingUpdatePaymentStatusCommand(bookingId)
    );
  }

  async delete(tripId: string): Promise<Trip> {
    return await this.commandBus.execute(new TripsDeleteCommand(tripId));
  }

  async acceptTripRequest(tripId: string, bookingId: string): Promise<Trip> {
    return await this.commandBus.execute(
      new AcceptTripRequestCommand(tripId, bookingId)
    );
  }

  async declineTripRequest(bookingId: string): Promise<Booking> {
    return await this.commandBus.execute(
      new DeclineTripRequestCommand(bookingId)
    );
  }

  async startTrip(tripId: string): Promise<Trip> {
    return await this.commandBus.execute(new StartTripCommand(tripId));
  }

  async endTrip(tripId: string): Promise<Trip> {
    return await this.commandBus.execute(new EndTripCommand(tripId));
  }

  async findAllTripRequests(userId: string): Promise<Booking[]> {
    return await this.queryBus.execute(new FindAllTripRequestsQuery(userId));
  }
}
