import { Error } from './auth-types';

export type DriverProfileState = {
  driver: DriverProfile | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type DriverProfile = {
  userId: string;
  idNumber: string;
  license: string;
  licensePlate: string;
  model: string;
  user: {
    name: string;
    surname: string;
    cellNumber: string;
  };
};
