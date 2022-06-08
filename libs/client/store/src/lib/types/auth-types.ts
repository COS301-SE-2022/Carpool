export type UserState = {
  user: User | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type User = {
  id: string;
  token?: string;
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
};
