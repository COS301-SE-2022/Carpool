export class TripsCreateCommand {
  constructor(
    public readonly driver: string,
    public readonly tripDate: string,
    public readonly seatsAvailable: string,
    public readonly price: string,
    public readonly status: string,
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

export class BookingUpdatePaymentStatusCommand {
  constructor(public readonly bookingId: string) {}
}

export class TripsDeleteCommand {
  constructor(public readonly tripId: string) {}
}

export class AcceptTripRequestCommand {
  constructor(
    public readonly tripId: string,
    public readonly bookingId: string
  ) {}
}

export class StartTripCommand {
  constructor(public readonly tripId: string) {}
}

export class EndTripCommand {
  constructor(public readonly tripId: string) {}
}

export class DeclineTripRequestCommand {
  constructor(public readonly bookingId: string) {}
}

export class CancelTripCommand {
  constructor(public readonly tripId: string) {}
}

export class PassengerCancelCommand {
  constructor(public readonly tripId: string, userId: string) {}
}
