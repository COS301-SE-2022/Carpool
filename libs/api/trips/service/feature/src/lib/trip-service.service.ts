import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { Booking, Trip } from '@carpool/api/trips/entities';
import {
  FindAllQuery,
  FindByDriverQuery,
  FindByPassengerQuery,
  FindBookingByTripQuery,
  FindTripByIdQuery,
  FindCoordinatesByTripQuery,
  SearchTripsQuery,
} from './queries/trips-query.query';
import { Location } from '@carpool/api/trips/entities';
import {
  TripsCreateCommand,
  TripsUpdateCommand,
  BookTripCommand,
  TripsDeleteCommand,
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

  async findBookingByTrip(tripID: string): Promise<Booking[] | null> {
    return await this.queryBus.execute(new FindBookingByTripQuery(tripID));
  }

  async findCoordinatesByTrip(tripID: string): Promise<Location[] | null> {
    return await this.queryBus.execute(new FindCoordinatesByTripQuery(tripID));
  }

  async searchTrips(date: string): Promise<Trip[] | null> {
    return await this.queryBus.execute(new SearchTripsQuery(date));
  }

  async create(
    tripDate: Date,
    seatsAvailable: number,
    price: number,
    startLocation: string,
    destination: string,
    category: string,
    status: string,
    driver: string
  ): Promise<Trip> {
    return await this.commandBus.execute(
      new TripsCreateCommand(
        tripDate,
        seatsAvailable,
        price,
        startLocation,
        destination,
        category,
        status,
        driver
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

  async delete(tripId: string): Promise<Trip> {
    return await this.commandBus.execute(new TripsDeleteCommand(tripId));
  }
}
