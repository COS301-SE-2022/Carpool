import { TripCard } from '@carpool/client/components';
import { formatDate } from '@carpool/client/shared/utilities';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatisticsProps } from '../NavigationTypes/navigation-types';

export function Statistics({ navigation }: StatisticsProps) {
  return (
    <View>
      
      <View>
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        >
          Requests
        </Text>
      </View>
      <View style={{ display: 'flex', flex: 0.05 }} />
        <Icon
          name="arrow-left"
          size={35}
          style={{ color: '#808080', marginHorizontal: 20 }}
          onPress={//() => navigation.goBack()
            () => navigation.navigate('HomePage')}
        />
      <View>
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          <TripCard
            key={'cl3sgpfna0014e1t0ge00e7af'}
            tripId={'cl3sgpfna0014e1t0ge00e7af'}
            driver={'George'}
            startLocation={
              'Eco Lake, Tamarillo Street, Eco-Park Estate, Centurion, South Africa'
            }
            destination={
              'University of Pretoria, Lynnwood Rd, Hatfield, Pretoria, South Africa'
            }
            created={formatDate('2020-01-01T00:00:00.000Z')}
            image={require('../assets/title.png')}
            date={formatDate('2020-01-01T00:00:00.000Z')}
            distance="2.5 km"
            onPress={() => navigation.push('AcceptRequest')}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Statistics;
