/* eslint-disable-next-line */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {ReviewCard} from '@carpool/client/components';


export function RatingCard(){
  const [modalVisible, setModalVisible] = useState(false);

  const ratingCompleted = (rating:number) => {
    console.log("Rating is: " + rating)
    setModalVisible(true)

  }
  return (
    <View>
      <View style={styles.row}>
        <Image
            source={require('./lighter_grey.png')}
            resizeMode="contain"
            style={styles.image}
          />
        <Text style={styles.textLargeBlack}>
          How was your trip with Benjamin?
        </Text>
        <Text style={styles.textMediumLight}>
          Tuesday morning to University of Pretoria
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
          modalVisible?  <ReviewCard /> : null
        }

    </View>
);
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  row:{
    flexDirection: "row",
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#188aed'
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
  Containershadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 25,
  },
  hide:{
    display: 'none',
  }

});

export default RatingCard;
