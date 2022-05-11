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
