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

export const TRIP_DETAILS = `
  query($id: String!) {
    findTripById(id: $id) {
      tripId,
       driver {
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
