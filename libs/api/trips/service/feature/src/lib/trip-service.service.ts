import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { User } from '@carpool/api/authentication/entities';
import {
  Booking,
  Trip,
  BookingInput,
  TripsUpdate,
} from '@carpool/api/trips/entities';
import {
  FindAllQuery,
  FindByDriverQuery,
  FindByPassengerQuery,
  FindBookingByTripQuery,
  FindTripByIdQuery,
  FindCoordinatesByTripQuery,
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
    userId: string,
    tripId: string,
    bookingDate: Date,
    seatsBooked: number,
    status: string,
    price: number
  ): Promise<Booking> {
    return await this.commandBus.execute(
      new BookTripCommand(
        userId,
        tripId,
        bookingDate,
        seatsBooked,
        status,
        price
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
