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

export type RootStackParamList = {
  Home: undefined;
  TripDetails: { tripId: string };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TripDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'TripDetails'
>;
