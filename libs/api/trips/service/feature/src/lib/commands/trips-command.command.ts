import { User } from '@carpool/api/authentication/entities';

export class TripsCreateCommand {
  constructor(
    public readonly driver: string,
    public readonly tripDate: string,
    public readonly seatsAvailable: string,
    public readonly price: string,
    public readonly startLocationAddress: string,
    public readonly startLocationLongitude: string,
    public readonly startLocationLatitude: string,
    public readonly destinationAddress: string,
    public readonly destinationLongitude: string,
    public readonly destinationLatitude: string
  ) {}
}

export class BookTripCommand {
  constructor(
    public readonly userId: string,
    public readonly tripId: string,
    public readonly bookingDate: Date,
    public readonly seatsBooked: number,
    public readonly status: string,
    public readonly price: number
  ) {}
}

export class TripsUpdateCommand {
  constructor(
    public readonly tripId: string,
    public readonly seatsAvailable: number,
    public readonly price: number,
    public readonly status: string
  ) {}
}

export class TripsDeleteCommand {
  constructor(public readonly tripId: string) {}
}
