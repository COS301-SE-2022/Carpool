export const LIST_TRIPS = `
  query {
    findAllTrips {
      tripId,
       driver {
        id,
        name,
        surname,
        profilePic
      },
      tripDate,
      createdAt,
      coordinates {
        address,
        latitude,
        longitude
      },
      status
    }
  }
`;

export const DRIVER_HISTORY = `
query ($id: String!) {
  findByDriver(id: $id) {
    tripId,
    driver {
			profilePic,
      name,
      surname
    }
    coordinates {
			address,
    }
    tripDate,
    createdAt,
	}
}
`;

export const SEARCH_RESULTS = `
  query($date: String!, $startLongitude: String!, $startLatitude: String!, $destinationLongitude: String!, $destinationLatitude: String!) {
    searchTrips(date: $date, startLongitude: $startLongitude, startLatitude: $startLatitude, destinationLongitude: $destinationLongitude, destinationLatitude: $destinationLatitude) {
      tripId,
    driver {
			profilePic,
      name,
      surname
    }
    coordinates {
			address,
    }
    tripDate,
    createdAt,
    }
  }
`;

export const CONFIRMED_TRIPS = `
  query($id: String!) {
    findByConfirmedTrips(id: $id) {
      tripId,
    driver {
			profilePic,
      name,
      surname
    }
    coordinates {
			address,
    }
    tripDate,
    createdAt,
    price,
    passengers {
      bookingId,
      tripId,
      userId
    }
    }
  }
`;

export const REQUESTED_TRIPS = `
  query($id: String!) {
    findByRequestedTrips(id: $id) {
      tripId,
    driver {
			profilePic,
      name,
      surname
    }
    coordinates {
			address,
    }
    tripDate,
    createdAt,
    price,
    }
  }
`;

export const PASSENGER_HISTORY = `
query ($id: String!) {
  findByPassenger(id: $id) {
    tripId,
    driver {
			profilePic,
      name,
      surname
    }
    coordinates {
			address,
    }
    tripDate,
    createdAt,
	}
}
`;

export const UPCOMING_TRIP = `
  query {
    findUpcomingTrip {
      tripId,
      tripDate,
      coordinates {
        address,
      }
    }
  }
`;

export const TRIP_DETAILS = `
  query($id: String!) {
    findTripById(id: $id) {
      tripId,
       driver {
         id,
        name,
        surname,
        profilePic
      },
      tripDate,
      createdAt,
      seatsAvailable,
      price,
      coordinates {
        address,
        latitude
        longitude,
      },
      status
    }
  }
`;

export const CREATE_TRIP = `
  mutation (
    $driver: String!,
    $tripDate: String!,
    $seatsAvailable: String!,
    $price: String!,
    $status: String!,
    $startLocationAddress: String!,
    $startLocationLongitude: String!,
    $startLocationLatitude: String!,
    $destinationAddress: String!,
    $destinationLongitude: String!,
    $destinationLatitude: String!) {
    create(
      driver: $driver,
      tripDate: $tripDate,
      seatsAvailable: $seatsAvailable,
      price: $price,
      status: $status,
      startLocationAddress: $startLocationAddress,
      startLocationLongitude: $startLocationLongitude,
      startLocationLatitude: $startLocationLatitude,
      destinationAddress: $destinationAddress,
      destinationLongitude: $destinationLongitude,
      destinationLatitude: $destinationLatitude
      ) {
      tripId
    }
  }
`;

export const BOOK_TRIP = `
  mutation($tripId: String!, $passengerId: String!, $seatsBooked: String!, $status: String!, $price: String!, $address: String!, $latitude: String!, $longitude: String!) {
    bookTrip(tripId: $tripId, passengerId: $passengerId, seatsBooked: $seatsBooked, status: $status, price: $price, address: $address, longitude: $longitude, latitude: $latitude) {
      tripId,
    }
  }
`;

export const BOOKING_ID = `
query($tripId: String!, $userId: String!) {
  findBookingByTripAndUserId(tripId: $tripId, userId: $userId) {
    bookingId,
  }
}
`;

export const ACCEPT_REQ = `
mutation ($bookingId: String!, $id: String!) {
  acceptTripRequest(bookingId: $bookingId, id: $id) {
    tripId
  }
}
`;

export const DECLINE_REQ = `
mutation ($bookingId: String!) {
  declineTripRequest(bookingId: $bookingId) {
    bookingId
  }
}
`;

export const START_TRIP = `
mutation ($id: String!) {
  startTrip(id: $id) {
    tripId
  }
}
`;

export const END_TRIP = `
mutation ($id: String!) {
  endTrip (id: $id) {
    tripId
  }
}
`;

export const PAYMENT_STATUS_UPDATE = `
mutation ($bookingId: String!) {
  updatePaymentStatus(bookingId: $bookingId) {
    bookingId
  }
}`;

export const FIND_REQUESTS = `
query ($userId: String!) {
  findAllTripRequests(userId: $userId) {
    bookingId,
    user {
			id,
      name,
      surname
    },
    trip {
      tripDate,
      tripId,
      coordinates {
        address
      }
    }
  }
}
`;

export const CANCEL_DRIVER_TRIP = `
mutation ($tripId: String!) {
  cancelTrip(tripId: $tripId) {
    tripId
  }
}
`;

