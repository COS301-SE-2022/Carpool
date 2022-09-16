import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { CheckoutTripsProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  RootStore,
  listConfirmedTrips,
  listRequestedTrips,
} from '@carpool/client/store';
import { TripCardCheckout } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function CheckoutTrips({ navigation }: CheckoutTripsProps) {
  const dispatch: AppDispatch = useDispatch();

  const [confirmed, setConfirmed] = useState(true);

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const confirmedTrip = useSelector((state: RootStore) => state.confirmedTrip);
  const { trips: cTrips, status: cStatus } = confirmedTrip;

  const requestedTrip = useSelector((state: RootStore) => state.requestedTrip);
  const { trips: pTrips, status: pStatus } = requestedTrip;

  useEffect(() => {
    if (userData) {
      dispatch(listConfirmedTrips(userData.id));
    }
  }, [dispatch, userData]);

  const asConfirmed = () => {
    setConfirmed(true);
    console.log('As Confirmed Trips');
    userData && dispatch(listConfirmedTrips(userData.id));
  };

  const asRequested = () => {
    setConfirmed(false);
    console.log('As Requested Trips');
    userData && dispatch(listRequestedTrips(userData.id));
  };

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId, type: 'completed' });
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          marginBottom: 10,
        }}
      >
        <Icon
          name="chevron-left"
          size={25}
          style={{
            color: '#000',
            flex: 1,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 15,
            flex: 10,
            textAlign: 'center',
          }}
        >
          Trip Checkout
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
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
          onPress={asConfirmed}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: confirmed ? '#188aed' : 'transparent',
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: confirmed ? '#fff' : '#000',
              fontWeight: '600',
            }}
          >
            Confirmed
          </Text>
        </Pressable>
        <Pressable
          onPress={asRequested}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: !confirmed ? '#188aed' : 'transparent',
            borderRadius: 15,
          }}
        >
          <Text
            style={{ color: !confirmed ? '#fff' : '#000', fontWeight: '600' }}
          >
            Requested
          </Text>
        </Pressable>
      </View>
      {cStatus === 'loading' || pStatus === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          {confirmed ? (
            cTrips?.length === 0 ? (
              <Text>You have not offered any trips...</Text>
            ) : (
              cTrips?.map((trip, index) => (
                <View key={index}>
                  <TripCardCheckout
                    startLocation={trip.coordinates[0].address}
                    destination={trip.coordinates[1].address}
                    date={trip.tripDate}
                    type="passenger"
                    price={trip.price}
                    onPress={() =>
                      navigation.push('CreditCard', { tripId: trip.tripId })
                    }
                  />
                  {/* <Button
                    title="Pay Now"
                    onPress={() =>
                      navigation.push('CreditCard', { tripId: trip.tripId })
                    }
                  /> */}
                </View>
              ))
            )
          ) : pTrips?.length === 0 ? (
            <Text>You have not taking any trips...</Text>
          ) : (
            pTrips?.map((trip) => (
              <TripCardCheckout
                key={trip.tripId}
                startLocation={trip.coordinates[0].address}
                destination={trip.coordinates[1].address}
                date={trip.tripDate}
                type="passenger"
                price={trip.price}
                onPress={() => viewTrip(trip.tripId)}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default CheckoutTrips;
