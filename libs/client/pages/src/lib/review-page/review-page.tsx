import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ReviewPageProps } from '../NavigationTypes/navigation-types';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { AppDispatch, RootStore, postReview, updateReviewPassenger, findBookingId } from '@carpool/client/store';
import { AirbnbRating } from 'react-native-ratings';
import {getDay, getTimeOfDay } from '@carpool/client/shared/utilities';
export function ReviewPage({ route, navigation }: ReviewPageProps) {

  const dispatch: AppDispatch = useDispatch();

  const [modalVisible2, setModalVisible2] = useState(true);

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const {tripId,driverId, driver, date, destination} = route.params;

  const [rate, setRate] = useState('');
  const [comment, setComment] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const bookindIdState = useSelector((state: RootStore) => state.bookingId);
  const { bookingId, status, error } = bookindIdState;

  useEffect(() => {
    if (userData) {
      dispatch(findBookingId({ tripId, userId: userData.id }));
    }
  }, [dispatch, userData, tripId, navigation]);


  const ratingCompleted = (rating:string) => {
    setRate(rating);
    console.log("Rating is: " + rating)
    setModalVisible(true)

  }


  const submitHandler = () => {
    console.log("The review has been posted")
    if(userData){
    dispatch(
      postReview({
        byId: userData?.id,
        forId: driverId,
        tripId: tripId,
        role: "PASSENGER",
        comment: comment,
        rating: rate,
      })
    );
    if (bookingId) {
      dispatch(updateReviewPassenger(bookingId));
    }
    }
    setModalVisible2(false)
    setTimeout(() => {
        navigation.push('HomePage');
      }, 3000);

  };
  return (
    <View style={styles.centeredView}>
      {modalVisible2?
         <View style={styles.modalView}>
              <View>
      <View style={styles.row}>
        <Image
            source={require('./lighter_grey.png')}
            resizeMode="contain"
            style={styles.image}
          />
        <Text style={styles.textLargeBlack}>
          How was your trip with {driver} ?
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
        {
          modalVisible?
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
         : null
        }

    </View>
            <TouchableOpacity
              onPress={submitHandler}
              style={[styles.container,]}>
              <Text style={styles.text}>Rate</Text>
            </TouchableOpacity>
    </View>
       : (
        <View style={styles.Thankyou}>
          <Text style={{ color: '#4BB543', textAlign: 'center', fontSize: 20 }}>
            Thank you for Reviewing!
          </Text>
          <Image source={require('./thankYou.png')} resizeMode="contain" />
        </View>
      )}
    </View>
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
    marginTop:'-8%',
    fontSize: 11,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 5,
  },
  row:{
    flexDirection: "row",
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
    borderColor: '#188aed'
  },
  hide:{
    display: 'none',
  }
});

export default ReviewPage;
