export const ADMIN_LOGIN = `
query ($email: String!, $password: String!) {
  adminLogin(email: $email, password: $password) {
    id
    email
    name
    surname
  }
}
`;

export const TRIPS_FOR_MONTH = `
query {
  findTripsForMonth
}
`;

export const BOOKINGS_FOR_MONTH = `
query {
  findBookingsForMonth
}
`;

export const TOTAL_USERS = `
query {
  findTotalUsers
}
`;

export const TOP_USERS = `
query {
  findTopUsers {
    name
    surname
    avgRating
  }
}
`;

export const TOTAL_DRIVERS = `
query {
  findTotalDrivers
}
`;

export const RECENT_USERS = `
query {
  findRecentUsers {
    profilePic
		name
    surname
    university
    createdAt
  }
}
`;

export const TRIPS_BY_MONTH = `
query {
  findTripsByMonth {
		month
    trips
  }
}
`;

export const TOP_UNIVERSITIES = `
query {
  findTopUniversities {
    university
    _count {
			university
    }
  }
}
`;

export const LIST_USERS = `
query {
  findAllUsers {
    id
    name
    surname
    cellNumber
    university
    studentNumber
    isDriver
    createdAt
  }
}
`;

export const GET_USER_PROFILE = `
query($id: String!) {
  findUserById(id: $id) {
    id
    name
    surname
    email
    university
    studentNumber
    cellNumber
    isDriver
    createdAt
    tripsCreated {
      tripId
    }
    bookings {
      bookingId
    }
  }
}
`;

export const GET_DRIVER_PROFILE = `
query($id: String!) {
  findDriverProfile(userId: $id) {
    licensePlate
    model
    idNumber
  }
}
`;

export const USER_TRIPS = `
query ($id: String!) {
  findByDriver (id: $id) {
    tripId
    tripDate
    createdAt
    price
    passengers {
      bookingId
    }
    status
  }
}
`;

export const TRIP_DETAILS = `
query($id: String!) {
  findTripById(id: $id) {
    tripId
    tripDate
    createdAt
    price
    status
    driver {
      profilePic
      name
      surname
      avgRating
    }
    passengers {
      bookingId
      user {
        profilePic
        name
        surname
      }
    }
    coordinates {
      address
      latitude
      longitude
    }
  }
}
`;

export const GET_ALL_TRIPS = `
query {
  findAllTrips {
    tripId
    tripDate
    createdAt
    price
    status
    driver {
      profilePic
      name
      surname
    }
    passengers {
      bookingId
      user {
        profilePic
        name
        surname
      }
    }
    coordinates {
      address
      latitude
      longitude
    }
  }
}
`;
