export class FindAllQuery {}

export class FindByDriverQuery {
  constructor(public readonly driverId: string) {}
}

export class FindByPassengerQuery {
  constructor(public readonly passengerId: string) {}
}

export class findByConfirmedTripsQuery {
  constructor(public readonly passengerId: string) {}
}

export class findByRequestedTripsQuery {
  constructor(public readonly passengerId: string) {}
}

export class FindBookingByTripQuery {
  constructor(public readonly tripId: string) {}
}

export class FindCoordinatesByTripQuery {
  constructor(public readonly tripId: string) {}
}

export class FindTripByIdQuery {
  constructor(public readonly tripId: string) {}
}

export class SearchTripsQuery {
  constructor(public readonly date: string) {}
}
