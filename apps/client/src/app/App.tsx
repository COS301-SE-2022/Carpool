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
} from '@carpool/client/pages';
import { Provider } from 'react-redux';
import { store } from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchStorage } from '@carpool/client/store';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type RootStackParamList = {
  Home;
  TripDetails;
};

export type AuthStackParamList = {
  Onboard;
  Login;
  SignUp;
  ForgotPassword;
  ConfirmEmail;
  ResetPassword;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

store.dispatch(fetchStorage());

const AppWrapper = () => {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  // SecureStore.deleteItemAsync('user');

  return (
    <NavigationContainer theme={navTheme}>
      {user && user.token ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#188aed',
            tabBarInactiveTintColor: '#188aed',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="TripDetails" component={TripDetails} />
        </Tab.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Onboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Onboard" component={OnboardPage} />
          <AuthStack.Screen name="Login" component={LoginPage} />
          <AuthStack.Screen name="SignUp" component={SignUpPage} />
          <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordPage}
          />
          <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmailPage} />
          <AuthStack.Screen
            name="ResetPassword"
            component={ResetPasswordPage}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppWrapper />
        <Toast />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
