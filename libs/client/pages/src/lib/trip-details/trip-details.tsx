/* eslint-disable-next-line */
import React from 'react';
import { TripDetailsProps } from '../NavigationTypes/navigation-types';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import MapView from 'react-native-maps';

export function TripDetails({ route, navigation }: TripDetailsProps) {
  const { tripId } = route.params;

  const bookRide = (tripId: string) => {
    console.log(`Booking ride ${tripId}`);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: '#188aed',
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: 60,
          marginBottom: -10,
          paddingHorizontal: 30,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Icon
          name="arrow-left"
          size={22}
          style={{ color: '#fff', flex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 4 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '800',
              fontSize: 35,
              marginBottom: 10,
            }}
          >
            12 May
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              maxWidth: '80%',
              lineHeight: 20,
            }}
          >
            Trip to University of Pretoria, Hatfield Campus
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Insert Map Here</Text>
        {/* <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
      </View>
      <View
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <View style={{ flex: 2, padding: 20 }}>
            <Text>Start Location</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderTopColor: '#808080',
              borderTopWidth: 0.3,
              borderBottomColor: '#808080',
              borderBottomWidth: 0.3,
            }}
          >
            <View
              style={{
                borderRightWidth: 0.3,
                borderRightColor: '#808080',
                padding: 10,
                // flex: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Icons
                name="attach-money"
                size={15}
                style={{ marginRight: 5 }}
                color="#188aed"
              />
              <Text style={{ fontWeight: '700' }}>R30</Text>
            </View>
            <View
              style={{
                // flex: 4,
                flexGrow: 1,
                borderRightWidth: 0.3,
                borderRightColor: '#808080',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Icons name="person" size={15} color="#188aed" />
              <Icons name="person" size={15} color="#808080" />
              <Icons
                name="person"
                size={15}
                style={{ marginRight: 3 }}
                color="#808080"
              />
              <Text style={{ fontWeight: '700' }}>2 Seats</Text>
            </View>
            <View
              style={{
                // flex: 3,
                borderRightWidth: 0.3,
                borderRightColor: '#808080',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Icon
                name="calendar"
                size={15}
                color="#188aed"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontWeight: '700', fontSize: 12 }}>
                12/05/2022
              </Text>
            </View>
            <View
              style={{
                // flex: 2,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Icon
                name="clock"
                size={15}
                style={{ marginRight: 5 }}
                color="#188aed"
              />
              <Text style={{ fontWeight: '700' }}>3PM</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f8f8f8',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('./lighter_grey.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 15,
                  borderWidth: 3,
                  borderColor: '#188aed',
                }}
              />
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: '700', marginBottom: 5 }}
                >
                  Benjamin Osmers
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#808080',
                    marginBottom: 10,
                  }}
                >
                  Last trip: 1 April 2022
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon size={15} name="star" color="#FACC15" />
                  <Icon size={15} name="star" color="#FACC15" />
                  <Icon size={15} name="star" color="#FACC15" />
                  <Icon size={15} name="star" color="#FACC15" />
                  <Icon size={15} name="star" color="#FACC15" />
                  <Text
                    style={{
                      color: '#808080',
                      fontSize: 12,
                      marginLeft: 5,
                      fontWeight: '600',
                    }}
                  >
                    5 ratings
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 50,
                padding: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Icons name="chat-bubble" color="#188aed" size={25} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button title="Book Ride" onPress={() => bookRide(tripId)} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default TripDetails;
