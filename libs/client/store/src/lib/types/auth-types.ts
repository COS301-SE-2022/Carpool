export type ImageUploadState = {
  image: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

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

export type CheckCodeState = {
  result: boolean | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type ForgotPasswordState = {
  user: ForgotPasswordType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type ForgotPasswordType = {
  email: string;
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
  profilePic: string;
  isDriver: boolean;
};

export type UpdateUserType = {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
