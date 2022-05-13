import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, listTrips } from '@carpool/client/store';
import { HomeProps } from '../NavigationTypes/navigation-types';
//import DatePicker from 'react-native-datepicker';
import { TripCard } from '@carpool/client/components';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  SafeAreaView,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Button, Center, Input, VStack } from 'native-base';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export function HomePage({ navigation }: HomeProps) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event:DateTimePickerEvent, selectedDate: Date) => {
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

  const dispatch: AppDispatch = useDispatch();

  const tripState = useSelector((state: RootStore) => state.trips);
  const { trips, status } = tripState;

  const [selected, setSelected] = useState(false);

  const [seats, setSeats] = useState(0);

  useEffect(() => {
    dispatch(listTrips());
  }, [dispatch]);

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId });
  };

  const openSearch = () => {
    navigation.push('Search');
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${day} ${monthNames[month]} ${year}`;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          paddingTop: 5,
          margin: 5,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}
        >
          <Pressable
            onPress={() => setSelected(false)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: !selected ? '#188aed' : 'transparent',
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: !selected ? '#fff' : '#000',
                fontWeight: '600',
              }}
            >
              Passenger
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelected(true)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: selected ? '#188aed' : 'transparent',
              borderRadius: 15,
            }}
          >
            <Text
              style={{ color: selected ? '#fff' : '#000', fontWeight: '600' }}
            >
              Driver
            </Text>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <TouchableOpacity onPress={openSearch}>
            <View style={[styles.locationShow, { marginBottom: 15 }]}>
              <View
                style={[
                  styles.flexRow,
                  {
                    alignSelf: 'flex-start',
                    flex: 5,
                    justifyContent: 'flex-start',
                  },
                ]}
              >
                <Icons
                  style={[styles.text, { marginRight: 8 }]}
                  name="location-on"
                  size={25}
                />
                <Text
                  style={[styles.text, { fontSize: 15, maxWidth: '75%' }]}
                  numberOfLines={1}
                >
                  Location
                </Text>
              </View>
              <Icons
                style={[styles.text, { marginRight: 8, color: '#188aed' }]}
                name="my-location"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
        {!selected ? (
          <>
            <View style={{ paddingHorizontal: 30 }}>
              <Text style={{ fontWeight: '700', fontSize: 25 }}>Nearby</Text>
            </View>
            <ScrollView
              style={{ paddingHorizontal: 30 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {status === 'loading' ? (
                <ActivityIndicator size="large" />
              ) : trips ? (
                /* eslint-disable-next-line */
                <>
                  {trips.map((trip) => (
                    <TripCard
                      key={trip.tripId}
                      tripId={trip.tripId}
                      driver={`${trip.driver.name} ${trip.driver.surname}`}
                      startLocation={trip.startLocation}
                      destination={trip.destination}
                      created="now"
                      image="./lighter_grey.png"
                      date={formatDate(trip.tripDate)}
                      distance="1"
                      onPress={() => viewTrip(trip.tripId)}
                    />
                  ))}
                </>
              ) : (
                <View
                  style={{
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={require('./no_trips.png')}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      color: '#808080',
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 20,
                    }}
                  >
                    No trips found...
                  </Text>
                  <Text
                    style={{
                      color: '#808080',
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 10,
                    }}
                  >
                    Try searching for your trip.
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        ) : (
          <View style={{ flexGrow: 1 }}>
            <VStack px={10} space={4}>
              <View style={styles.inputContainer}>
                <View style={[styles.flexCol, { flex: 1 }]}>
                  <Icon style={[styles.text]} name="clock" size={25} />
                  <Text style={styles.text}>Time</Text>
                </View>
                <View style={[styles.flexRow, { flex: 3 }]}>
                  <Button
                    bg={'#188aed'}
                    w={50}
                    variant="outline"
                    borderRadius={100}
                    onPress={showDatepicker}
                  >
                    <MaterialIcon name="calendar" size={25} color="white" />
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
                    <MaterialIcon name="clock" size={25} color="white" />
                  </Button>
                  {show && (
                    <RNDateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      // is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[styles.flexCol, { flex: 1 }]}>
                  <Icon style={[styles.text]} name="dollar-sign" size={25} />
                  <Text style={styles.text}>Trip Cost</Text>
                </View>

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
              </View>

              <View style={styles.inputContainer}>
                <View style={[styles.flexCol, { flex: 1 }]}>
                  <MaterialIcon
                    style={[styles.text]}
                    name="car-seat"
                    size={25}
                  />
                  <Text style={styles.text}>Seats</Text>
                </View>
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
                    <MaterialIcon name="minus" size={25} color="white" />
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
                    <MaterialIcon name="plus" size={25} color="white" />
                  </Button>
                </View>
              </View>

              <Button
                mt={10}
                backgroundColor={'#188aed'}
                h={50}
                borderRadius={100}
                onPress={() => setSelected(false)}
              >
                <Text style={{ fontSize: 22, color: 'white' }}>Submit</Text>
              </Button>
            </VStack>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  locationShow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 30,
    marginTop: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 3.5,
    marginLeft: 10,
    fontSize: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#808080',
    fontWeight: '600',
  },
  datePickerStyle: {
    width: 230,
  },
});

export default HomePage;
