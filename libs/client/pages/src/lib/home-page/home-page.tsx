import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, listTrips } from '@carpool/client/store';
import { HomeProps } from '../NavigationTypes/navigation-types';
import * as SecureStore from 'expo-secure-store';
import { TripCard } from '@carpool/client/components';
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

export function HomePage({ navigation }: HomeProps) {
  const dispatch: AppDispatch = useDispatch();

  const tripState = useSelector((state: RootStore) => state.trips);
  const { trips, status } = tripState;

  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState(true);

  const [role, setRole] = useState(0);

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
              {/* <TripCard
                tripId="1"
                driver="Benjamin Osmers"
                startLocation="Highveld"
                destination="University of Pretoria, Hatfield Campus"
                created="now"
                image="./lighter_grey.png"
                date="12 May 2022"
                distance="1"
                onPress={() => viewTrip('1')}
              /> */}
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
            <Text>Show driver screen</Text>
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#808080',
    fontWeight: '600',
  },
});

export default HomePage;
