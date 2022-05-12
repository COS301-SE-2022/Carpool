import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { Center, Box, Heading, HStack, Text, Pressable, Tag, VStack, Avatar } from 'native-base';
import { HomeProps } from '../NavigationTypes/navigation-types';
import { Button, UserTypeInput } from '@carpool/client/components';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function HomePage({ navigation }: HomeProps) {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const logoutHandler = () => {
    SecureStore.deleteItemAsync('user');
  };

  return (
    <Box safeAreaTop>

      <HStack w={'100%'} justifyContent="center">
        <UserTypeInput />
      </HStack>
      <Center w="100%" mt="10">
        {/* add search bar */}

        <HStack px="1" w="80%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
          {/* Add location image */}
          {/* <Box px="1" py="1" w="10%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
            <Text>📍</Text>
          </Box> */}
          <Center mx={3}>
            <Icon name="map-pin" size={24} color="#188aed" />
          </Center>

          <TextInput placeholderTextColor="#737373" placeholder='Select your destination' />
        </HStack>
        <Box p="2" py="8" w="90%" maxW="290">
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

          {/* <Button onPress={logoutHandler} title="Logout" /> */}
        </Box>
        <VStack space={4} alignItems="center" w="80%" h="200" bg="white" rounded="lg" shadow={3}>
          <HStack space={6} p={3} justifyContent="space-between" alignItems="center" >
            <Avatar bg="green.500" source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }}>
              AJ
            </Avatar>
            <Heading size="sm" color="#737373">John Smith</Heading>
            <HStack>
              <Icon name="star" size={20} color="#737373" />
              <Icon name="star" size={20} color="#737373" />
              <Icon name="star" size={20} color="#737373" />
              <Icon name="star" size={20} color="#737373" />
              <Icon name="star" size={20} color="#737373" />
            </HStack>

          </HStack>
          <HStack px="1" py="2" w="80%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
            <Center mx={3}>
              <Icon name="map-pin" size={24} color="#188aed" />
            </Center>
            <Text color="coolGray.500"
              _dark={{
                color: 'warmGray.50',
              }}>Select your destination</Text>
          </HStack>
          <HStack px="1" py="2" w="80%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
            <Center mx={3}>
              <Icon name="map-pin" size={24} color="#188aed" />
            </Center>
            <Text color="coolGray.500"
              _dark={{
                color: 'warmGray.50',
              }}>Select your destination</Text>
          </HStack>

        </VStack>
      </Center>
    </Box>
  );
}

export default HomePage;
