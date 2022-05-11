import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { Center, Box, Heading, HStack, Text, Pressable } from 'native-base';
import { HomeProps } from '../NavigationTypes/navigation-types';
import { Button } from '@carpool/client/components';
import * as SecureStore from 'expo-secure-store';

export function HomePage({ navigation }: HomeProps) {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const [selected, setSelected] = useState(0);

  const logoutHandler = () => {
    SecureStore.deleteItemAsync('user');
  };

  return (
    <Box safeAreaTop>
      <Center w="100%">
        <HStack
          px="1"
          py="3"
          justifyContent="center"
          alignItems="center"
          w="100%"
        >
          <HStack alignItems="center">
            <Pressable
              px="3"
              py="1"
              backgroundColor={selected === 0 ? 'black' : 'transparent'}
              borderRadius="full"
              onPress={() => setSelected(0)}
            >
              <Center>
                <Text
                  color={selected === 0 ? 'white' : 'black'}
                  fontSize="13"
                  fontWeight="medium"
                >
                  Driving
                </Text>
              </Center>
            </Pressable>
          </HStack>
          <HStack>
            <Pressable
              px="3"
              py="1"
              backgroundColor={selected === 1 ? 'black' : 'transparent'}
              borderRadius="full"
              onPress={() => setSelected(1)}
            >
              <Center>
                <Text
                  color={selected === 1 ? 'white' : 'black'}
                  fontSize="13"
                  fontWeight="medium"
                >
                  Passenger
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </HStack>
      </Center>
      <Center w="100%">
        <Box p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            Welcome {user && user.email}
          </Heading>
          <Button onPress={logoutHandler} title="Logout" />
        </Box>
      </Center>
    </Box>
  );
}

export default HomePage;
