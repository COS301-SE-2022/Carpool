import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReviewDriverPageProps } from '../NavigationTypes/navigation-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import {
  AppDispatch,
  RootStore,
  postReview,
  findBookingId,
  listAllPassengers,
  updateReviewDriver,
} from '@carpool/client/store';
import { AirbnbRating } from 'react-native-ratings';
import { getDay, getTimeOfDay } from '@carpool/client/shared/utilities';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-toast-message';

export function ReviewDriverPage({ route, navigation }: ReviewDriverPageProps) {
  const dispatch: AppDispatch = useDispatch();

  const [modalVisible2, setModalVisible2] = useState(true);

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const { tripId, date, destination } = route.params;

  const [rate, setRate] = useState('3');
  const [comment, setComment] = useState('');
  const [countReview, setCountReview] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  const allPassengers = useSelector((state: RootStore) => state.allPassengers);
  const {
    passengers: passengersList,
    status: allPassengersStatus,
    error: allPassengersError,
  } = allPassengers;

  useEffect(() => {
    if (userData) {
      dispatch(listAllPassengers(tripId));
    }
  }, [dispatch, tripId, userData]);

  const checkReviewsTotal = () => {
    if (passengersList?.length === countReview) {
      return true;
    }
    return false;
  };

  const ratingCompleted = (rating: string) => {
    setRate(rating);
    console.log('Rating is: ' + rating);
    setModalVisible(true);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'You have successfully completed your review',
    });
  };

  const submitHandler = (userforId: string) => {
    setCountReview(countReview + 1);

    console.log('The review has been posted');
    console.log('byId: ' + userData?.id);
    console.log('forId: ' + userforId);
    console.log('tripId: ' + tripId);
    console.log('rating: ' + rate);
    console.log('comment: ' + comment);
    console.log(countReview);

    // if(userData){
    // dispatch(
    //   postReview({
    //     byId: userData?.id,
    //     forId: userforId,
    //     tripId: tripId,
    //     role: "DRIVER",
    //     comment: comment,
    //     rating: rate,
    //   })
    // );

    if (passengersList?.length === countReview) {
      if (tripId) {
        dispatch(updateReviewDriver(tripId));
      }
      showToast();
      setTimeout(() => {
        navigation.push('TripRatingPage');
      }, 3000);
    }
  };
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      {passengersList?.map((passenger, index) => (
        <View key={index} style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.row}>
                <Image
                  source={{ uri: passenger.user.profilePic }}
                  resizeMode="contain"
                  style={styles.image}
                />
                <Text style={styles.textLargeBlack}>
                  How was your trip with {passenger.user.name}?
                </Text>
                <Text style={styles.textMediumLight}>
                  {getDay(date)} {getTimeOfDay(date)} to {destination}
                </Text>
              </View>
              <AirbnbRating
                count={5}
                defaultRating={3}
                size={20}
                showRating={false}
                onFinishRating={ratingCompleted}
              />
              <View>
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                  placeholder="(Optional) Tell us about your experience"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={(event) => submitHandler(passenger.userId)}
              style={[styles.container]}
            >
              <Text style={styles.text}>Rate</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderWidth: 2,
    margin: 10,
    borderColor: '#188aed',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 16,
  },
  textMediumLight: {
    marginLeft: '20%',
    marginTop: '-8%',
    fontSize: 11,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  container: {
    backgroundColor: '#188aed',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f8f8f8',
    padding: 20,
    margin: 10,
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredViewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -62,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    padding: 10,
    marginHorizontal: '10%',
    borderRadius: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  Thankyou: {
    position: 'absolute',
    width: '100%',
    padding: 10,
    marginHorizontal: '10%',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  hide: {
    display: 'none',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});

export default ReviewDriverPage;
