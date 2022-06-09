import React from 'react';
import { DriverProfileProps } from '../NavigationTypes/navigation-types';
import { View, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function DriverProfile({ route, navigation }: DriverProfileProps) {
  // const { driverId } = route.params;

  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          source={require('../assets/lighter_grey.png')}
          imageStyle={{
            resizeMode: 'cover',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 15,
            }}
          >
            <View style={{ flex: 1 }}>
              <Icon
                name="close"
                size={22}
                style={{ flex: 1, color: '#fff' }}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={{ flex: 3 }}></View>
            <View
              style={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '700',
                  paddingBottom: 3,
                }}
              >
                Benjamin Osmers
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
                <Text style={{ marginLeft: 5, marginBottom: 0, color: '#fff' }}>
                  5.0 (13)
                </Text>
                <Text
                  style={{ marginLeft: 10, marginBottom: 0, color: '#fff' }}
                >
                  <Icon name="directions-car" color="#fff" size={15} />
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 20,
          paddingBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '80%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 100,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
            marginTop: -15,
          }}
        >
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 0.5,
              borderRightColor: '#d5d5d5',
              paddingVertical: 10,
            }}
          >
            <Icon
              name="chat-bubble"
              size={18}
              style={{ marginRight: 8, color: '#188aed' }}
            />
            <Text style={{ fontWeight: '700' }}>Chat</Text>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
          >
            <Icon
              name="phone"
              size={18}
              style={{ marginRight: 8, color: '#188aed' }}
            />
            <Text style={{ fontWeight: '700' }}>Call</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 0.5,
            paddingVertical: 20,
            paddingHorizontal: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon
            name="directions-car"
            size={22}
            style={{ flex: 1, color: '#188aed' }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 7,
            }}
          >
            <Text style={{ fontWeight: '600' }}>Toyota Fortuner</Text>
            <Text style={{ color: '#808080', paddingLeft: 2 }}>
              FSG 817 L, White
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 0.5,
            paddingVertical: 20,
            paddingHorizontal: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="phone" size={22} style={{ flex: 1, color: '#188aed' }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 6,
            }}
          >
            <Text style={{ fontWeight: '600' }}>+27 71 600 2219</Text>
            <Text style={{ color: '#808080', paddingLeft: 2 }}>
              Phone number
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#26e548',
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 20,
              flex: 1.5,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
              }}
            >
              Verified
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DriverProfile;
