import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, listTrips } from '@carpool/client/store';
import { HomeProps } from '../NavigationTypes/navigation-types';
import * as SecureStore from 'expo-secure-store';
//import DatePicker from 'react-native-datepicker';
import {
  Button,
  InlineInputs,
  Input,
  TripCard,
} from '@carpool/client/components';
import * as ReactDOM from 'react-dom';

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
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NumberInput, NumberInputField } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export function HomePage(this: any, { navigation }: HomeProps) {
  //const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date) => {
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
  const [search, setSearch] = useState(true);
  const [date, setDate] = useState(new Date());
  //setDate = (event, date) => {};
  const [postStatus, setPostStatus] = useState('');

  const [role, setRole] = useState(0);
  const [dateDisplay, setDateDisplay] = useState(false);

  useEffect(() => {
    dispatch(listTrips());
  }, [trips, dispatch]);

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId });
  };

  const openSearch = () => {
    navigation.push('Search');
  };

  const datePicker = () => {
    return (
      <RNDateTimePicker
        mode="date"
        onChange={() => setDate(date)}
        value={new Date()}
      />
    );
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
              <TripCard
                tripId="1"
                driver="Benjamin Osmers"
                startLocation="Highveld"
                destination="University of Pretoria, Hatfield Campus"
                created="now"
                image="./lighter_grey.png"
                date="12 May 2022"
                distance="1"
                onPress={() => viewTrip('1')}
              />
              {status === 'loading' ? (
                <ActivityIndicator size="large" />
              ) : trips ? (
                /* eslint-disable-next-line */
                <>
                  {trips.map((trip) => (
                    <TripCard
                      tripId={trip.tripId}
                      driver={trip.driver}
                      startLocation={trip.startLocation}
                      destination={trip.destination}
                      created="now"
                      image="./lighter_grey.png"
                      date={trip.date}
                      distance={trip.distance}
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
            <View style={{ paddingHorizontal: 30 }}>
              {/* <InlineInputs onChangeTextOne={function (text: string): void {
                throw new Error('Function not implemented.');
              }} onChangeTextTwo={function (text: string): void {
                throw new Error('Function not implemented.');
              }} inputOneValue={''} inputOnePlaceholder={''} inputTwoValue={''} inputTwoPlaceholder={''} iconName={'clock'} /> */}

              <View style={styles.inputContainer}>
                <View style={[styles.flexCol, { flex: 1 }]}>
                  <Icon style={[styles.text]} name="clock" size={25} />
                  <Text style={styles.text}>Schedule</Text>
                </View>
                <View>
                  <Button onPress={showDatepicker} title="Date" />
                </View>
                <View>
                  <Button onPress={showTimepicker} title="Time" />
                </View>
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                  <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.flexCol, { flex: 1 }]}>
                  <Icon style={[styles.text]} name="dollar-sign" size={25} />
                  <Text style={styles.text}>Trip Cost</Text>
                </View>
                <TextInput style={styles.input} placeholder="R200" />
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
                {/* <NumberInput autoCompleteType={null} /> */}
                {/* <NumberInputField  style={styles.input} placeholder="2" /> */}
                <TextInput style={styles.input} placeholder="4" />
              </View>

              <View style={{ height: 20 }}></View>

              <Button
                title={
                  postStatus == ''
                    ? 'Submit'
                    : postStatus == 'success'
                    ? 'Posted'
                    : ''
                }
                onPress={() => {
                  setPostStatus('loading');
                  setTimeout(() => {
                    setPostStatus('success');
                  }, 2000);
                }}
              />
              {/* } */}
            </View>
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
