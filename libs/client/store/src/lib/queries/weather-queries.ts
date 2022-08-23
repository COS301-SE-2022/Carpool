export const GET_WEATHER = `
  query($lat: String!, $long: String!) {
    getWeather(lat: $lat, long: $long) {
      isRaining,
      isWindy,
      isSnowing,
      windSpeed,
      temperature
    }
  }
`;
