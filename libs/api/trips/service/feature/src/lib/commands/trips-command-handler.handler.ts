import { Trip, Booking, Review } from '@prisma/client';
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
  UpdatePassengerReviewsCommand,
  UpdateDriverReviewsCommand,
  CreateReviewCommand,
} from './trips-command.command';
import { ReviewInput, TripsUpdate } from '@carpool/api/trips/entities';

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
@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: CreateReviewCommand): Promise<Review | null> {
    const {
      byId,
      forId,
      tripId,
      role,
      comment,
      rating,
    } = command;


    return await this.tripsRepository.postReview(byId, forId, tripId, role, comment, rating);
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

@CommandHandler(UpdatePassengerReviewsCommand)
export class UpdatePassengerReviewsHandler implements ICommandHandler<UpdatePassengerReviewsCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: UpdatePassengerReviewsCommand): Promise<Booking | null> {
    const { bookingId } = command;

    return await this.tripsRepository.updateReviewPassenger(bookingId);
  }
}

@CommandHandler(UpdateDriverReviewsCommand)
export class UpdateDriverReviewsHandler implements ICommandHandler<UpdateDriverReviewsCommand> {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(command: UpdateDriverReviewsCommand): Promise<Trip | null> {
    const { tripId } = command;

    return await this.tripsRepository.updateReviewDriver(tripId);
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
