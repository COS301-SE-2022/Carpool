import { Trip, Booking } from '@prisma/client';
import { TripsRepository } from '@carpool/api/trips/repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import {
  TripsCreateCommand,
  TripsUpdateCommand,
  TripsDeleteCommand,
  BookTripCommand,
  AcceptTripRequestCommand,
  StartTripCommand,
  EndTripCommand,
  BookingUpdatePaymentStatusCommand,
  DeclineTripRequestCommand,
  CancelTripCommand,
  PassengerCancelCommand,
} from './trips-command.command';
import { TripsUpdate } from '@carpool/api/trips/entities';

@CommandHandler(TripsCreateCommand)
export class TripsCreateHandler implements ICommandHandler<TripsCreateCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: TripsCreateCommand): Promise<Trip | null> {
    const {
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
      destinationLatitude,
    } = command;

    return await this.tripsRepository.create(
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
    );
  }
}

@CommandHandler(BookTripCommand)
export class BookTripHandler implements ICommandHandler<BookTripCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: BookTripCommand): Promise<Booking | null> {
    const {
      tripId,
      passengerId,
      seatsBooked,
      status,
      price,
      address,
      longitude,
      latitude,
    } = command;

    return await this.tripsRepository.bookTrip(
      tripId,
      passengerId,
      seatsBooked,
      status,
      price,
      address,
      longitude,
      latitude
    );
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

@CommandHandler(BookingUpdatePaymentStatusCommand)
export class BookingUpdatePaymentStatusHandler
  implements ICommandHandler<BookingUpdatePaymentStatusCommand>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(
    command: BookingUpdatePaymentStatusCommand
  ): Promise<Booking | null> {
    const { bookingId } = command;

    return await this.tripsRepository.updatePaymentStatus(bookingId);
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

@CommandHandler(AcceptTripRequestCommand)
export class AcceptTripRequestHandler
  implements ICommandHandler<AcceptTripRequestCommand>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: AcceptTripRequestCommand): Promise<Trip | null> {
    const { tripId, bookingId } = command;
    return await this.tripsRepository.acceptTripRequest(tripId, bookingId);
  }
}

@CommandHandler(DeclineTripRequestCommand)
export class DeclineTripRequestHandler
  implements ICommandHandler<DeclineTripRequestCommand>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: DeclineTripRequestCommand): Promise<Booking | null> {
    const { bookingId } = command;
    return await this.tripsRepository.declineTripRequest(bookingId);
  }
}

@CommandHandler(StartTripCommand)
export class StartTripHandler implements ICommandHandler<StartTripCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: StartTripCommand): Promise<Trip | null> {
    const { tripId } = command;

    return await this.tripsRepository.startTrip(tripId);
  }
}

@CommandHandler(EndTripCommand)
export class EndTripHandler implements ICommandHandler<EndTripCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: EndTripCommand): Promise<Trip | null> {
    const { tripId } = command;

    return await this.tripsRepository.endTrip(tripId);
  }
}

@CommandHandler(CancelTripCommand)
export class CancelTripHandler implements ICommandHandler<CancelTripCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: CancelTripCommand): Promise<Trip | null> {
    const { tripId } = command;
    return await this.tripsRepository.cancelTrip(tripId);
  }
}

@CommandHandler(PassengerCancelCommand)
export class PassengerCancelHandler
  implements ICommandHandler<PassengerCancelCommand>
{
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: PassengerCancelCommand): Promise<Trip | null> {
    const { tripId, userId } = command;
    return await this.tripRepository.passengerCancel(tripId, userId);
  }
}
