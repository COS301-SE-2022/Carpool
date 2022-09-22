export const DRIVER_PROFILE = `
  query ($userId: String!) {
     findDriverProfile(userId: $userId) {
        userId
        license
        licensePlate
        idNumber
        model
        user {
          name
          surname
          cellNumber
        }
     }
  }
`;
