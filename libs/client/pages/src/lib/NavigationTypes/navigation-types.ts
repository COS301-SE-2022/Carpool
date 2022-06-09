import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export type RootStackParamList = {
  HomePage: undefined;
  LoginPage: undefined;
  OnboardPage: undefined;
  SignUpPage: undefined;
  SignOut: undefined;
  ForgotPasswordPage: undefined;
  ConfirmEmailPage: undefined;
  ResetPasswordPage: undefined;
  TripDetails: { tripId: string; type: string };
  SearchPage: undefined;
  UserProfile: { userId: string };
  DriverProfile: { driverId: string };
  EditProfile: undefined;
  Statistics: undefined;
  TripHistory: undefined;
  SetPickupPage: {
    tripId: string;
    passengerId: string;
    seatsBooked: string;
    status: string;
    price: string;
  };
  SearchResults: {
    date: string;
    startLongitude: string;
    startLatitude: string;
    destinationLongitude: string;
    destinationLatitude: string;
  };
  ChatScreen: undefined;
};

export type HomePageProps = NativeStackScreenProps<
  RootStackParamList,
  'HomePage'
>;

export type LoginPageProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginPage'
>;

export type OnboardPageProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardPage'
>;

export type SignUpPageProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpPage'
>;

export type SignOutProps = NativeStackScreenProps<
  RootStackParamList,
  'SignOut'
>;

export type ForgotPasswordPageProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordPage'
>;

export type ConfirmEmailPageProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmEmailPage'
>;

export type ResetPasswordPagePageProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPasswordPage'
>;

export type TripDetailsPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TripDetails'
>;

export type SearchPageProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchPage'
>;

export type UserProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'UserProfile'
>;

export type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export type StatisticsProps = NativeStackScreenProps<
  RootStackParamList,
  'Statistics'
>;

export type TripHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  'TripHistory'
>;

export type DriverProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverProfile'
>;

export type SearchResultsProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResults'
>;

export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatScreen'
>;

export type SetPickupPageProps = NativeStackScreenProps<
  RootStackParamList,
  'SetPickupPage'
>;
