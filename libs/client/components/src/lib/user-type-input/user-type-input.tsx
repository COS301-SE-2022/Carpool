import { Center, Box, Heading, HStack, Text, Pressable } from 'native-base';

import React, { useState } from 'react';


/* eslint-disable-next-line */
export interface UserTypeInputProps {}

export function UserTypeInput(props: UserTypeInputProps) {
  const [selected, setSelected] = useState(0);
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
              onPress={() => setSelected(0)}
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
              onPress={() => setSelected(1)}
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
