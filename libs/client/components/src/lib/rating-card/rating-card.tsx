/* eslint-disable-next-line */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';


export function RatingCard(){
  const ratingCompleted = (rating:number) => {
    console.log("Rating is: " + rating)
  }

  const submitHandler = () => {
    console.log("Where disptach for rating goes")
    // dispatch(login({ email, password }));
  };
  return (
    <View style={[styles.flexCol, styles.userContainer]}>
    <View
      style={[
        styles.flexRow,
        {
          flex: 1,
        },
      ]}
    >
      <View
        style={[
          styles.flexRow,
          {
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 15,
            marginVertical: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

          },
        ]}
      >
        <Image
          source={require('./lighter_grey.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <View>
          <Text
            style={[
              styles.textLargeBlack,
              {
                marginBottom: 5,
              },
            ]}
          >
            How was your driving with Benjamin?
          </Text>
          <Text style={styles.textMediumLight}>Tuesday morning to University of Pretoria</Text>
          <AirbnbRating
            count={5}
            defaultRating={3}
            size={30}
            showRating={false}
            onFinishRating={ratingCompleted}
            />
            <TouchableOpacity
        onPress={submitHandler}
        style={[styles.container,]}>
        <Text style={styles.text}>Rate</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
  userContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 16,
  },
  textMediumLight: {
    fontSize: 11,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 5,
  },
  container: {
    backgroundColor: '#188aed',
    width: '30%',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
    left: '70%',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

});

export default RatingCard;
