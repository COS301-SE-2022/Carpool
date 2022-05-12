import { Trip, Booking } from '@prisma/client';
import { TripsRepository } from '@carpool/api/trips/repository/data-access';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import {
  TripsCreateCommand,
  TripsUpdateCommand,
  TripsDeleteCommand,
  BookTripCommand,
} from './trips-command.command';
import {
  BookingInput,
  TripsInput,
  TripsUpdate,
} from '@carpool/api/trips/api/shared';

@CommandHandler(TripsCreateCommand)
export class TripsCreateHandler implements ICommandHandler<TripsCreateCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: TripsCreateCommand): Promise<Trip | null> {
    const {
      tripDate,
      seatsAvailable,
      price,
      startLocation,
      destination,
      category,
      status,
      driver,
    } = command;

    const trip = new TripsInput();
    trip.tripDate = tripDate;
    trip.seatsAvailable = seatsAvailable;
    trip.price = price;
    trip.startLocation = startLocation;
    trip.destination = destination;
    trip.category = category;
    trip.status = status;
    trip.driverId = driver;
    return await this.tripsRepository.create(trip);
  }
}

@CommandHandler(BookTripCommand)
export class BookTripHandler implements ICommandHandler<BookTripCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: BookTripCommand): Promise<Booking | null> {
    const { userId, tripId, bookingDate, seatsBooked, status, price } = command;

    const booking = new BookingInput();
    booking.userId = userId;
    booking.tripId = tripId;
    booking.bookingDate = bookingDate;
    booking.seatsBooked = seatsBooked;
    booking.status = status;
    booking.price = price;

    return await this.tripsRepository.bookTrip(booking);
  }
}

@CommandHandler(TripsUpdateCommand)
export class TripsUpdateHandler implements ICommandHandler<TripsUpdateCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: TripsUpdateCommand): Promise<Trip | null> {
    const { tripId, seatsAvailable, price, status } = command;

    const tripUpdate = new TripsUpdate();
    tripUpdate.seatsAvailable = seatsAvailable;
    tripUpdate.price = price;
    tripUpdate.status = status;
    return await this.tripsRepository.update(tripId, tripUpdate);
  }
}

@CommandHandler(TripsDeleteCommand)
export class TripsDeleteHandler implements ICommandHandler<TripsDeleteCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: TripsDeleteCommand): Promise<Trip | null> {
    const { tripId } = command;

    return await this.tripsRepository.delete(tripId);
  }
}
