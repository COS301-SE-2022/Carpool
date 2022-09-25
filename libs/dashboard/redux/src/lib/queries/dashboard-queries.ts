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
