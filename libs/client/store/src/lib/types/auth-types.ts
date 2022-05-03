export type UserState = {
  user: User | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
};

export type Error = {
  message: string;
};
