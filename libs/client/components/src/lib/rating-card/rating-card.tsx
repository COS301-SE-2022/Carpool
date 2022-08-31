/* eslint-disable-next-line */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';


export function RatingCard(){
  const ratingCompleted = (rating:number) => {
    console.log("Rating is: " + rating)
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


    </View>
  //   <View style={[styles.flexCol, styles.userContainer]}>
  //   <View
  //     style={[
  //       styles.flexRow,
  //       {
  //         flex: 1,
  //       },
  //     ]}
  //   >
  //     <View
  //       style={[
  //         styles.flexRow,
  //         {
  //           flex: 1,
  //           justifyContent: 'flex-start',
  //           paddingHorizontal: 20,
  //           paddingVertical: 15,
  //           borderRadius: 15,
  //           marginVertical: 10,
  //           backgroundColor: '#fff',
  //           shadowColor: '#000',
  //           shadowOffset: {
  //             width: 0,
  //             height: 2,
  //           },
  //           shadowOpacity: 0.25,
  //           shadowRadius: 3.84,
  //           elevation: 5,

  //         },
  //       ]}
  //     >
  //       <Image
  //         source={require('./lighter_grey.png')}
  //         resizeMode="contain"
  //         style={styles.image}
  //       />
  //       <View>
  //         <Text
  //           style={[
  //             styles.textLargeBlack,
  //             {
  //               marginBottom: 5,
  //             },
  //           ]}
  //         >
  //           How was your trip with Benjamin?
  //         </Text>
  //         <Text style={styles.textMediumLight}>Tuesday morning to University of Pretoria</Text>
  //         <AirbnbRating
  //           count={5}
  //           defaultRating={3}
  //           size={20}
  //           showRating={false}
  //           onFinishRating={ratingCompleted}
  //           // ratingContainerStyle={{left: '-10%'}}
  //           />
  //     <TouchableOpacity
  //       onPress={submitHandler}
  //       style={[styles.container,]}>
  //       <Text style={styles.text}>Rate</Text>
  //     </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // </View>
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

});

export default RatingCard;
