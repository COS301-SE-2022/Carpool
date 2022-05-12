export class FindAllQuery {}

export class FindByDriverQuery {
  constructor(public readonly driverId: string) {}
}

export class FindByPassengerQuery {
  constructor(public readonly passengerId: string) {}
}

export class FindBookingByTripQuery {
  constructor(public readonly tripId: string) {}
}
