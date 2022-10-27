/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  HomePage,
  LoginPage,
  OnboardPage,
  SignUpPage,
  ForgotPasswordPage,
  ConfirmEmailPage,
  ResetPasswordPage,
  TripDetails,
  SearchPage,
  DriverProfile,
  UserProfile,
  EditProfile,
  Statistics,
  TripHistory,
  SearchResults,
  ChatScreen,
  SetPickupPage,
  PostTrips,
  CheckoutTrips,
  CreditCard,
  DriverActiveTrip,
  RegisterDriver,
  ReviewPage,
  PayfastPage,
  ChatList,
  TripRatingPage,
  MapboxTest,
  ReviewDriverPage,
  ForgotPasswordCodePage,
  NewPasswordPage,
  NotificationsPage,
  BookingRequest,
} from '@carpool/client/pages';
import { Provider } from 'react-redux';
import {
  store,
  RootStore,
  AppDispatch,
  findUpcomingTrip,
} from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchStorage } from '@carpool/client/store';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { createUploadLink } from 'apollo-upload-client';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export type RootStackParamList = {
  HomePage;
  LoginPage;
  OnboardPage;
  BookingRequest;
  SignUpPage;
  ForgotPasswordCodePage;
  NewPasswordPage;
  SignOut;
  ForgotPasswordPage;
  ConfirmEmailPage;
  ResetPasswordPage;
  TripDetails;
  SearchPage;
  UserProfile;
  EditProfile;
  Statistics;
  TripHistory;
  DriverProfile;
  SearchResults;
  ChatScreen;
  SetPickupPage;
  PostTrips;
  CheckoutTrips;
  CreditCard;
  DriverActiveTrip;
  RegisterDriver;
  ReviewPage;
  NotificationsPage;
  PayfastPage;
  ChatList;
  TripRatingPage;
  MapboxTest;
};

export type TabBarParamList = {
  Home;
  Profile;
  ChatList;
  MapboxTest;
};

export type AuthStackParamList = {
  LoginPage;
  OnboardPage;
  ForgotPasswordCodePage;
  NewPasswordPage;
  SignUpPage;
  ForgotPasswordPage;
  ConfirmEmailPage;
  ResetPasswordPage;
};

export type HomeStackParamList = {
  HomePage;
  SearchPage;
  TripDetails;
  ReviewPage;
};

export type ProfileStackParamList = {
  UserProfile;
  EditProfile;
  Statistics;
  TripHistory;
  ReviewPage;
  ReviewDriverPage;
  NewPasswordPage;
  TripRatingPage;
};

const Tab = createBottomTabNavigator<TabBarParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const ProfileStackNav = createNativeStackNavigator<ProfileStackParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

store.dispatch(fetchStorage());

const HomeStack = () => {
  return (
    <HomeStackNav.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNav.Screen name="HomePage" component={HomePage} />
      <HomeStackNav.Screen name="TripDetails" component={TripDetails} />
      <HomeStackNav.Screen name="SearchPage" component={SearchPage} />
    </HomeStackNav.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStackNav.Screen name="UserProfile" component={UserProfile} />
      <ProfileStackNav.Screen
        name="NewPasswordPage"
        component={NewPasswordPage}
      />
      <ProfileStackNav.Screen name="EditProfile" component={EditProfile} />
      <ProfileStackNav.Screen name="Statistics" component={Statistics} />
      <ProfileStackNav.Screen name="TripHistory" component={TripHistory} />
      <ProfileStackNav.Screen name="ReviewPage" component={ReviewPage} />
      <ProfileStackNav.Screen
        name="ReviewDriverPage"
        component={ReviewDriverPage}
      />
      <ProfileStackNav.Screen
        name="TripRatingPage"
        component={TripRatingPage}
      />
    </ProfileStackNav.Navigator>
  );
};

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            case 'ChatList':
              iconName = focused ? 'chat' : 'chat-outline';
              break;
            default:
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#188aed',
        tabBarInactiveTintColor: '#188aed',
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 22,
          shadowColor: '#555',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          marginTop: -15,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{ title: 'Messages' }}
      />
      {/* <Tab.Screen
        name="MapboxTest"
        component={MapboxTest}
        options={{ title: 'Mapbox' }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const AuthNav = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="OnboardPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LoginPage" component={LoginPage} />
      <AuthStack.Screen name="OnboardPage" component={OnboardPage} />
      <AuthStack.Screen name="SignUpPage" component={SignUpPage} />
      <AuthStack.Screen
        name="ForgotPasswordCodePage"
        component={ForgotPasswordCodePage}
      />
      <AuthStack.Screen name="NewPasswordPage" component={NewPasswordPage} />
      <AuthStack.Screen
        name="ForgotPasswordPage"
        component={ForgotPasswordPage}
      />
      <AuthStack.Screen name="ConfirmEmailPage" component={ConfirmEmailPage} />
      <AuthStack.Screen
        name="ResetPasswordPage"
        component={ResetPasswordPage}
      />
    </AuthStack.Navigator>
  );
};

const NOTIF_SUB = gql`
  subscription Subscription {
    requestReceived {
      message
      userId
    }
  }
`;

const TRIP_STARTED = gql`
  subscription Subscription {
    tripStarted {
      message
      userId
    }
  }
`;

const MSG_SUB = gql`
  subscription Subscription {
    messageSent {
      id
      message
      senderId
      receiverId
      sender {
        id
        name
        surname
      }
      receiver {
        id
        name
        surname
      }
      createdAt
    }
  }
`;

const AppWrapper = () => {
  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const showToast = (message: string) => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: message,
    });
  };

  const { data: subData } = useSubscription(NOTIF_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (data && user.id === data.requestReceived.userId) {
        showToast(data.requestReceived.message);
      }
    },
  });

  const { data } = useSubscription(TRIP_STARTED, {
    onSubscriptionData({ subscriptionData: { data } }) {
      console.log(data.tripStarted);
      if (data) {
        data.tripStarted.map((notif) => {
          if (user.id === notif.userId) {
            showToast(notif.message);
          }

          dispatch(findUpcomingTrip(user.id));
        });
      }
    },
  });

  const { data: msgData } = useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (data.messageSent.receiverId === user.id) {
        showToast('new message in chats');
      }
    },
  });

  return (
    <NavigationContainer theme={navTheme}>
      {user && user.token ? (
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MapboxTest" component={MapboxTest} />
          <Stack.Screen name="BookingRequest" component={BookingRequest} />
          <Stack.Screen name="HomePage" component={TabBar} />
          <Stack.Screen name="RegisterDriver" component={RegisterDriver} />
          <Stack.Screen name="PostTrips" component={PostTrips} />
          <Stack.Screen name="DriverActiveTrip" component={DriverActiveTrip} />
          <Stack.Screen name="CheckoutTrips" component={CheckoutTrips} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="TripDetails" component={TripDetails} />
          <Stack.Screen name="CreditCard" component={CreditCard} />
          <Stack.Screen name="PayfastPage" component={PayfastPage} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen
            name="NotificationsPage"
            component={NotificationsPage}
          />
          <Stack.Screen name="SearchPage" component={SearchPage} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="DriverProfile" component={DriverProfile} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="SetPickupPage" component={SetPickupPage} />
          </Stack.Group>
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Statistics" component={Statistics} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="TripHistory" component={TripHistory} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="ReviewPage" component={ReviewPage} />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

const httpLink = new HttpLink({
  uri: 'https://carpoolcos301.herokuapp.com/graphql',
});

const uploadLink = createUploadLink({
  // uri: 'https://carpoolcos301.herokuapp.com/graphql',
  uri: 'http://localhost:3333/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    // url: 'ws://carpoolcos301.herokuapp.com/graphql',
    url: 'ws://localhost:3333/graphql',
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <Provider store={store}>
          <AppWrapper />
          <Toast />
        </Provider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
