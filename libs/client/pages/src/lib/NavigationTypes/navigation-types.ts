import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export type RootStackParamList = {
  HomePage: undefined;
  RegisterDriver: { userId: string };
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
  ChatScreen: { senderId: string; receiverId: string };
  PostTrips: undefined;
  CheckoutTrips: undefined;
  CreditCard:  {tripId: string, description: string, cost: number};
  AcceptRequest: undefined;
  DriverActiveTrip: { tripId: string };
  PassengerActiveTrip: undefined;
  ReviewPage: { tripId: string, driverId: string, driver: string, date: string, destination: string };
  PayfastPage:  {description: string, cost: number};
  TripRatingPage: { tripId: string };
  ReviewDriverPage: { tripId: string, date: string, destination: string };
};

export type HomePageProps = NativeStackScreenProps<
  RootStackParamList,
  'HomePage'
>;

export type ChatListProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatList'
>;

export type RegisterDriverProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterDriver'
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

export type PostTripsProps = NativeStackScreenProps<
  RootStackParamList,
  'PostTrips'
>;

export type CheckoutTripsProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckoutTrips'
>;

export type CreditCardProps = NativeStackScreenProps<
  RootStackParamList,
  'CreditCard'
>;
export type DriverActiveTripProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverActiveTrip'
>;

export type PassengerActiveTripProps = NativeStackScreenProps<
  RootStackParamList,
  'PassengerActiveTrip'
>;

export type AcceptRequestProps = NativeStackScreenProps<
  RootStackParamList,
  'AcceptRequest'
>;

export type ReviewPageProps = NativeStackScreenProps<
  RootStackParamList,
  'ReviewPage'
>;

export type ReviewDriverPageProps = NativeStackScreenProps<
  RootStackParamList,
  'ReviewDriverPage'
>;


export type PayfastPageProps = NativeStackScreenProps<
  RootStackParamList,
  'PayfastPage'
>;

export type TripRatingPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TripRatingPage'
>;
