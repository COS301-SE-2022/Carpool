import { RootStore } from '@carpool/client/store';
import { NavigationRouteContext } from '@react-navigation/native';
import { HomeProps, PostTripsProps } from 'libs/client/pages/src/lib/NavigationTypes/navigation-types';
import { Center, Box, Heading, HStack, Text, Pressable, Icon, Stack, Input } from 'native-base';

import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';


/* eslint-disable-next-line */

export function UserTypeInput({navigation}: UserTypeInputProps) {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const [selected, setSelected] = useState(0);

  const SelectedHandler = () => {
    if(selected===0){
      //return <Passenger/>;
      HomePageProps.navigation.navigate("Home");
      //navigation.navigate('Home');
    }else{
      //return <Driver/>;
      PostTripsProps.navigation.navigate("PostTrips");
      //navigation.navigate('PostTrips');
    }
  }

  const Driver = () => {
    return <Stack space={4} w="100%" alignItems="center">
        <Input w={{
        base: "75%",
        md: "25%"
      }} InputLeftElement={<Icon name="map-pin" size={5} color="muted.400" />} placeholder="Select your pickup" />
        <Input w={{
        base: "75%",
        md: "25%"
      }} InputLeftElement={<Icon name="navigation" size={5} color="muted.400" onPress={() => setShow(!show)} />} placeholder="Select your destination" />
      </Stack>;
  };

  const Passenger = () => {
    {/* add search bar */}
    return <HStack px="1" py="1" w="80%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
    {/* Add location image */}
    {/* <Box px="1" py="1" w="10%" borderColor={'#188aed'} borderWidth={1} borderRadius={100}>
      <Text>📍</Text>
    </Box> */}
    <TextInput placeholder='Select your destination'/>
    </HStack>
  }

  return (
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
          <HStack>
            <Pressable
              px="3"
              py="1"
              backgroundColor={selected === 0 ? '#188aed' : 'transparent'}
              borderRadius="full"
              onPress={() => SelectedHandler()}
            >
              <Center>
                <Text
                  color={selected === 0 ? 'white' : 'black'}
                  fontSize="13"
                  fontWeight="medium"
                >
                  Passenger
                </Text>
              </Center>
            </Pressable>
          </HStack>
          <HStack alignItems="center">
            <Pressable
              px="3"
              py="1"
              backgroundColor={selected === 1 ? '#188aed' : 'transparent'}
              borderRadius="full"
              onPress={() => SelectedHandler()}
            >
              <Center>
                <Text
                  color={selected === 1 ? 'white' : 'black'}
                  fontSize="13"
                  fontWeight="medium"
                >
                  Driving
                </Text>
              </Center>
            </Pressable>
          </HStack>

        </HStack>
      </Center>
  );
}

export default UserTypeInput;
