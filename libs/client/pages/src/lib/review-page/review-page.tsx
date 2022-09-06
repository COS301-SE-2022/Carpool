import React, { useState } from 'react';
import { ReviewPageProps } from '../NavigationTypes/navigation-types';
import { RatingCard, ReviewCard} from '@carpool/client/components';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export function ReviewPage({ navigation }: ReviewPageProps) {

  const [modalVisible, setModalVisible] = useState(true);

  const reviewToNothing = () => {
    console.log("Change from Review Modal to Nothing")
    setModalVisible(false)
  };
  return (
    <View style={styles.centeredView}>
      {modalVisible?
         <View style={styles.modalView}>
             <RatingCard/>

            <TouchableOpacity
              onPress={reviewToNothing}
              style={[styles.container,]}>
              <Text style={styles.text}>Rate</Text>
            </TouchableOpacity>
        </View>
        :
        <View style={styles.Thankyou}>
                  <Text style ={{color:'#4BB543', textAlign: 'center',fontSize: 20,}}>
                    Thank you for Reviewing!
                  </Text>
        <Image
                  source={require('./thankYou.png')}
                  resizeMode="contain"
        />

        </View>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderWidth: 2,
    margin:10,
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: 'absolute',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    padding: 10,
    marginHorizontal:'10%',
    borderRadius: 15
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  Thankyou: {
    position: 'absolute',
    width: '100%',
    padding: 10,
    marginHorizontal:'10%',
  }
});

export default ReviewPage;

