import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { Center, Box, Heading, HStack, Text, Pressable } from 'native-base';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomePage({ navigation }: Props) {
  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!user || !user.name) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

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
            Welcome {user?.name}
          </Heading>
        </Box>
      </Center>
    </Box>
  );
}

export default HomePage;
