import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Actionsheet, Box, Button, Center, useDisclose, Text, VStack, Input, HStack } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* eslint-disable-next-line */
export interface PostTripFormProps { }

export function PostTripForm(props: PostTripFormProps) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [seats, setSeats] = useState(0);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return (
    <Center>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          onChange={onChange}
        />
      )}
      <Button bg={'#188aed'} borderRadius={100} onPress={onOpen}>
        <Center>
          <Icon name="car" size={20} color={'#fff'} />
          <Text color={'white'}>New Pool</Text>
        </Center>
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={5} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
              color: "gray.300"
            }}>
              New Trip
            </Text>
          </Box>
          <VStack w={'100%'} px={2} space={8}>
            <HStack justifyContent={'space-between'}>
              <VStack flex={1}>
                <Center>
                  <Icon name="clock" size={25} />
                  <Text >Time</Text>
                </Center>
              </VStack>
              <HStack flex={3}>
                <Button
                  bg={'#188aed'}
                  w={50}
                  variant="outline"
                  borderRadius={100}
                  onPress={showDatepicker}
                >
                  <Icon name="calendar" size={25} color="white" />
                </Button>

                <Center flex={1}>
                  <Text style={{ fontSize: 16 }}>
                    {date.toLocaleDateString()}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {date.toLocaleTimeString()}
                  </Text>
                </Center>

                <Button
                  bg={'#188aed'}
                  w={50}
                  variant="outline"
                  borderRadius={100}
                  onPress={showTimepicker}
                >
                  <Icon name="clock" size={25} color="white" />
                </Button>
              </HStack>
            </HStack>

            <HStack justifyContent={'space-between'}>
              <VStack flex={1}>
                <Center>
                  <Icon name="cash" size={25} />
                  <Text>Trip Cost</Text>
                </Center>

              </VStack>

              <Input
                fontSize={18}
                flex={3}
                borderRadius={100}
                borderColor={'trueGray.400'}
                w={{
                  base: '75%',
                  md: '25%',
                }}
                InputLeftElement={
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>R</Text>
                }
                placeholder="200"
              />
            </HStack>

            <HStack>
              <VStack flex={1}>
                <Center>
                  <Icon
                    name="car-seat"
                    size={25}
                  />
                  <Text >Seats</Text>
                </Center>
              </VStack>
              <View
                style={{ flex: 3, display: 'flex', flexDirection: 'row' }}
              >
                <Button
                  bg={'#188aed'}
                  w={50}
                  variant="outline"
                  borderRadius={100}
                  onPress={() => setSeats(seats - 1)}
                >
                  <Icon name="minus" size={25} color="white" />
                </Button>

                <Input
                  mx={5}
                  fontSize={20}
                  textAlign={'center'}
                  flex={1}
                  borderRadius={100}
                  borderColor={'trueGray.400'}
                  value={`${seats}`}
                />

                <Button
                  bg={'#188aed'}
                  w={50}
                  variant="outline"
                  borderRadius={100}
                  onPress={() => setSeats(seats + 1)}
                >
                  <Icon name="plus" size={25} color="white" />
                </Button>
              </View>
            </HStack>

            <Button
              mt={5}
              backgroundColor={'#188aed'}
              h={50}
              borderRadius={100}
              onPress={() => setSelected(false)}
            >
              <Text style={{ fontSize: 22, color: 'white' }}>Post Trip</Text>
            </Button>
          </VStack>
          {/* <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default PostTripForm;
