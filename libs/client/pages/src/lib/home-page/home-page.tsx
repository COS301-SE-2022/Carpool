import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, listTrips } from '@carpool/client/store';
import { HomePageProps } from '../NavigationTypes/navigation-types';
import {
  TripCardSmall,
  HomeOptionBox,
  HomeSearchBar,
  HomeMapView,
} from '@carpool/client/components';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './home-page.style';
import Icon from 'react-native-vector-icons/Feather';

// import { FormProvider, useForm } from 'react-hook-form';
// import {
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import CreditCardForm, { Button, FormModel } from 'rn-credit-card';

export function HomePage({ navigation }: HomePageProps) {
  const dispatch: AppDispatch = useDispatch();
  const tripState = useSelector((state: RootStore) => state.trips);
  const { trips, status } = tripState;

  useEffect(() => {
    dispatch(listTrips());
  }, [dispatch]);

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId, type: 'booked' });
  };

  // const formMethods = useForm<FormModel>({
  //   mode: 'onBlur',
  //   defaultValues: {
  //     holderName: '',
  //     cardNumber: '',
  //     expiration: '',
  //     cvv: '',
  //   },
  // });
  // const { handleSubmit, formState } = formMethods;

  // const onSubmit = (model: FormModel) => {
  //   Alert.alert('Success: ' + JSON.stringify(model, null, 2));
  // };

  return (
    <View style={[styles.flexCol, { flex: 1 }]}>
      <HomeSearchBar onPress={() => navigation.push('SearchPage')} />
      {/* <FormProvider {...formMethods}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.avoider}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <CreditCardForm
              LottieView={LottieView}
              horizontalStart
              overrides={{
                labelText: {
                  marginTop: 16,
                },
              }}
            />
          </KeyboardAvoidingView>
          {formState.isValid && (
            <Button
              style={styles.button}
              title={'CONFIRM PAYMENT'}
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </SafeAreaView>
      </FormProvider> */}

      <HomeMapView />

      <View style={styles.bottomContainer}>
        <HomeOptionBox
          onPress={() => navigation.push('SearchPage')}
          onPressCreate={() => navigation.push('PostTrips')}
        />
        <View style={styles.cardContainer}>
          <Text style={styles.smallTextBlack}>Upcoming trip
          <Icon
            name="shopping-cart"
            size={30}
            style={{ color: '#188aed', alignSelf: 'flex-end'}}
            onPress={() =>navigation.push('CheckoutTrips')}
        />
        </Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : trips ? (
            <>
              {trips.map((trip) => (
                <TripCardSmall
                  key={trip.tripId}
                  startLocation={trip.coordinates[0].address}
                  destination={trip.coordinates[1].address}
                  date={trip.tripDate}
                  type="passenger"
                  onPress={() => viewTrip(trip.tripId)}
                />
              ))}
            </>
          ) : (
            <View style={styles.noTripContainer}>
              <Text style={[styles.bigText]}>You have no upcoming trips</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default HomePage;
