import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, login, RootStore } from '@carpool/client/store';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Button,
  Text,
  VStack,
} from 'native-base';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginPage({ navigation }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    if (user && user.name) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  const submitHandler = () => {
    dispatch(login({ email, password }));
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              value={email}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              autoCapitalize="none"
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={submitHandler}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginPage;
