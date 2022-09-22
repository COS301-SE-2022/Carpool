export type UserState = {
  user: User | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type User = {
  id: string;
  token?: string;
  email: string;
  isDriver: boolean;
};

export type DriverState = {
  driver: Driver | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Driver = {
  userId: string;
  idNumber: string;
  license: string;
  licensePlate: string;
  model: string;
  carPicture: string;
};

export type Error = {
  message: string;
};

export type UserProfileState = {
  userProfile: UserProfile | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type UserProfile = {
  id: string;
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  cellNumber: string;
};

export type UpdateUserType = {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
