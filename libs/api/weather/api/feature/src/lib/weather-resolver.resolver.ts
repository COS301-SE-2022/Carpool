import { Resolver, Query, Args } from '@nestjs/graphql';
import { Weather } from '@carpool/api/weather/entities';
import axios from 'axios';

@Resolver()
export class WeatherResolver {
  @Query(() => Weather)
  async getWeather(
    @Args('lat') lat: string,
    @Args('long') long: string
  ): Promise<Weather> {
    const location = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ZLZ7t3NgGRDKOaXMKZshgK0Gf2UAyv5m&q=${lat}%2C${long}`
    );

    const conditions = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${location.data.Key}?apikey=ZLZ7t3NgGRDKOaXMKZshgK0Gf2UAyv5m&details=true`
    );

    const result = {
      isRaining: false,
      isWindy: false,
      windSpeed: `${conditions.data[0].Wind.Speed.Metric.Value}km/h`,
      isSnowing: false,
      temperature: `${conditions.data[0].Temperature.Metric.Value}°C`,
    };

    if (conditions.data[0].HasPrecipitation) {
      conditions.data[0].PrecipitationType === 'Rain' &&
        (result.isRaining = true);
      conditions.data[0].PrecipitationType === 'Snow' &&
        (result.isSnowing = true);
    }

    if (conditions.data[0].Wind.Speed.Metric.Value > 30) {
      result.isWindy = true;
    }

    return result;
  }
}
