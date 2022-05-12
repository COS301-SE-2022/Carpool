export const LIST_TRIPS = `
  query () {
     listTrips() {
        tripId
        driver {
          name
          surname
          profilePicture
        }
        startLocation
        destination
        tripDate
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
