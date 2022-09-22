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

export class findByPassengerReviewsQuery {
  constructor(public readonly passengerId: string) {}
}

export class findAllPassengersQuery {
  constructor(public readonly tripID: string) {}
}

export class findByDriverReviewsQuery {
  constructor(public readonly DriverId: string) {}
}

export class FindBookingByTripQuery {
  constructor(public readonly tripId: string) {}
}

export class FindBookingByTripAndUserIdQuery {
  constructor(public readonly tripId: string, public readonly userId: string) {}
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

export class FindAllTripRequestsQuery {
  constructor(public readonly userId: string) {}
}

export class FindUpcomingTripsQuery {
  constructor(public readonly userId: string) {}
}
