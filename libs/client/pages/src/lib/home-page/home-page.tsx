import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { Center, Box, Heading, HStack, Text, Pressable } from 'native-base';
import { HomeProps } from '../NavigationTypes/navigation-types';
import { Button } from '@carpool/client/components';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native';

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
          mt="3"
          px="3"
          py="2"
          justifyContent="center"
          alignItems="center"
          borderColor={'#188aed'}
          borderWidth={1}
          borderRadius={100}
        >
          <HStack alignItems="center">
            <Pressable
              px="3"
              py="1"
              backgroundColor={selected === 0 ? '#188aed' : 'transparent'}
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
              backgroundColor={selected === 1 ? '#188aed' : 'transparent'}
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
      <Center w="100%" mt="10">
        {/* add search bar */}
        <HStack px="1" py="1" w="80%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
          {/* Add location image */}
          {/* <Box px="1" py="1" w="10%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
            <Text>📍</Text>
          </Box> */}
          <TextInput placeholder='Select your destination'/>
        </HStack>
        <Box  p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            Carpool 
            {/* {user && user.email} */}
          </Heading>
          <Button onPress={logoutHandler} title="Logout" />
        </Box>
      </Center>
    </Box>
  );
}

export default HomePage;
