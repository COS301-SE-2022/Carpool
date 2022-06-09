export class TripsCreateCommand {
  constructor(
    public readonly tripDate: Date,
    public readonly seatsAvailable: number,
    public readonly price: number,
    public readonly startLocation: string,
    public readonly destination: string,
    public readonly category: string,
    public readonly status: string,
    public readonly driver: string
  ) {}
}

export class BookTripCommand {
  constructor(
    public readonly tripId: string,
    public readonly passengerId: string,
    public readonly seatsBooked: string,
    public readonly status: string,
    public readonly price: string,
    public readonly address: string,
    public readonly longitude: string,
    public readonly latitude: string
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
