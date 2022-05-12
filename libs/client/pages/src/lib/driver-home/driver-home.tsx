import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Pressable,
  Spacer,
} from 'native-base';
import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DriverHomeProps } from '../NavigationTypes/navigation-types';

/* eslint-disable-next-line */

function InteractiveBox() {
  return (
    <Box alignItems="center">
      <Pressable style={{ width: 350 }}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              maxW="96"
              borderWidth="1"
              borderColor="coolGray.300"
              shadow="2"
              bg={
                isPressed
                  ? 'coolGray.200'
                  : isHovered
                  ? 'coolGray.200'
                  : 'coolGray.100'
              }
              p="5"
              rounded="8"
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
            >
              <HStack alignItems="center">
                <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>
                  Name
                </Text>

                <Spacer />
                <Text style={{ fontSize: 16 }}>10 Minutes Ago</Text>
              </HStack>
              <Text style={{ fontSize: 18 }}>University</Text>
              <Text style={{ fontSize: 18 }}>Rating</Text>
              <Button
                mt={10}
                backgroundColor="#188aed"
                _text={{
                  color: 'white',
                }}
                variant="solid"
                rounded="4"
              >
                Accept
              </Button>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
}

export function DriverHome({ navigation }: DriverHomeProps) {
  return (
    <SafeAreaView>
      <View
        style={{
          left: 5,
          margin: 10,
        }}
      >
        <Icon
          name="arrow-left"
          size={30}
          style={{}}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View>
        <Center>
          <Text>Trip Details</Text>
        </Center>
      </View>
      <View>
        <InteractiveBox />
      </View>
    </SafeAreaView>
  );
}
export default DriverHome;
