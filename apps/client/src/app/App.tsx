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
} from '@carpool/client/pages';
import { Provider } from 'react-redux';
import { store, RootStore } from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchStorage } from '@carpool/client/store';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
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
import * as SecureStore from 'expo-secure-store';

export type RootStackParamList = {
  HomePage;
  LoginPage;
  OnboardPage;
  SignUpPage;
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
  PayfastPage;
  ChatList;
};

export type TabBarParamList = {
  Home;
  Profile;
  ChatList;
};

export type AuthStackParamList = {
  LoginPage;
  OnboardPage;
  SignUpPage;
  ForgotPasswordPage;
  ConfirmEmailPage;
  ResetPasswordPage;
};

export type HomeStackParamList = {
  HomePage;
  SearchPage;
  TripDetails;
  CheckoutTrips;
  CreditCard;
  ReviewPage;
  PayfastPage;
};

export type ProfileStackParamList = {
  UserProfile;
  EditProfile;
  Statistics;
  TripHistory;
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
      <HomeStackNav.Screen name="CheckoutTrips" component={CheckoutTrips} />
      <HomeStackNav.Screen name="CreditCard" component={CreditCard} />
      <HomeStackNav.Screen name="ReviewPage" component={ReviewPage} />
      <HomeStackNav.Screen name="PayfastPage" component={PayfastPage} />
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
      <ProfileStackNav.Screen name="EditProfile" component={EditProfile} />
      <ProfileStackNav.Screen name="Statistics" component={Statistics} />
      <ProfileStackNav.Screen name="TripHistory" component={TripHistory} />
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

const AppWrapper = () => {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  return (
    <NavigationContainer theme={navTheme}>
      {user && user.token ? (
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomePage" component={TabBar} />
          <Stack.Screen name="RegisterDriver" component={RegisterDriver} />
          <Stack.Screen name="PostTrips" component={PostTrips} />
          <Stack.Screen name="DriverActiveTrip" component={DriverActiveTrip} />
          {/* <Stack.Screen name="LoginPage" component={LoginPage} /> */}
          {/* <Stack.Screen name="OnboardPage" component={OnboardPage} /> */}
          {/* <Stack.Screen name="SignUpPage" component={SignUpPage} /> */}
          {/* <Stack.Screen name="SignOut" component={SignOut} /> */}
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          {/* <Stack.Screen
            name="ForgotPasswordPage"
            component={ForgotPasswordPage}
          /> */}
          {/* <Stack.Screen name="ConfirmEmailPage" component={ConfirmEmailPage} /> */}
          {/* <Stack.Screen
            name="ResetPasswordPage"
            component={ResetPasswordPage}
          /> */}
          <Stack.Screen name="TripDetails" component={TripDetails} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="SearchPage" component={SearchPage} />
        </Stack.Group> */}
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
        </Stack.Navigator>
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
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
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const App = () => {
  // SecureStore.deleteItemAsync('user');

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
