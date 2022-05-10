/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  HomePage,
  LoginPage,
  OnboardPage,
  SignUpPage,
} from '@carpool/client/pages';
import { Provider } from 'react-redux';
import { store } from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { useEffect } from 'react';

export type AuthParamList = {
  Home;
};

export type RootStackParamList = {
  Home;
  Login;
  Onboard;
  SignUp;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const AuthTab = createBottomTabNavigator<AuthParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

export const App = () => {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    if (user && user.name) {
      console.log('user logged in');
    }
  }, [user]);

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer theme={navTheme}>
          <Tab.Navigator
            initialRouteName="Onboard"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Home" component={HomePage} />

            <Tab.Screen
              name="Onboard"
              component={OnboardPage}
              options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
              name="Login"
              component={LoginPage}
              options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
              name="SignUp"
              component={SignUpPage}
              options={{ tabBarStyle: { display: 'none' } }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
