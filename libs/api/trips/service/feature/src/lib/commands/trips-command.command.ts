import { User } from '@carpool/api/authentication/entities';

export class TripsCreateCommand {
  constructor(
    public readonly tripDate: Date,
    public readonly seatsAvailable: number,
    public readonly price: number,
    public readonly startLocation: string,
    public readonly destination: string,
    public readonly category: string,
    public readonly status: string,
    public readonly driver: User
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
