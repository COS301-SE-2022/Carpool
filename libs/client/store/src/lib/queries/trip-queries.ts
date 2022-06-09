export const LIST_TRIPS = `
  query {
    findAllTrips {
      tripId,
       driver {
        name,
        surname,
        profilePic
      },
      tripDate,
      createdAt,
      coordinates {
        address,
      }
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
      }
    }
  }
`;

export const BOOK_TRIP = `
  mutation($tripId: String!, $passengerId: String!, $seatsBooked: String!, $status: String!, $price: String!, $address: String!, $latitude: String!, $longitude: String!) {
    bookTrip(tripId: $tripId, passengerId: $passengerId, seatsBooked: $seatsBooked, status: $status, price: $price, address: $address, latitude: $latitude, longitude: $longitude) {
      tripId,
    }
  }
`;

