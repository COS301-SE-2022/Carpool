import { Error } from './auth-types';

export type WeatherState = {
  weather: Weather | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Weather = {
  isRaining: boolean;
  isWindy: boolean;
  windSpeed: string;
  isSnowing: boolean;
  temperature: string;
};
