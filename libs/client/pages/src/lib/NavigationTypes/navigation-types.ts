import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export type AuthStackParamList = {
  Onboard: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ConfirmEmail: undefined;
  ResetPassword: undefined;
};

export type OnboardProps = NativeStackScreenProps<
  AuthStackParamList,
  'Onboard'
>;
export type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type SignupProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export type ConfirmEmailProps = NativeStackScreenProps<
  AuthStackParamList,
  'ConfirmEmail'
>;
export type ForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export type ResetPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ConfirmEmail'
>;

export type HomeStackParamList = {
  Home: undefined;
  TripDetails: { tripId: string };
  Search: undefined;
};

export type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export type TripDetailsProps = NativeStackScreenProps<
  HomeStackParamList,
  'TripDetails'
>;
export type SearchProps = NativeStackScreenProps<HomeStackParamList, 'Search'>;
