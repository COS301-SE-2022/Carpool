/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage, LoginPage } from '@carpool/client/pages';
// import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Provider } from 'react-redux';
import { store } from '@carpool/client/store';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home;
  Login;
};

// const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

export const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Login" component={LoginPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
