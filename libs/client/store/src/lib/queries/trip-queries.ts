export const LIST_TRIPS = `
  query {
     findAll {
        tripId
        driver {
          name
          surname
          profilePic
        }
        startLocation
        destination
        tripDate
     }
  }
`;
export const TRIP_DETAILS = `
  query($id: String!) {
     findTripById(id: $id) {
        tripId
        driver {
          name
          surname
          profilePic
        }
        startLocation
        destination
        tripDate
        price
        seatsAvailable
     }
  }
`;

// tripId: string;
// driver: string;
// startLocation: string;
// destination: string;
// created: string;
// image: string;
// date: string;
// distance: string;
