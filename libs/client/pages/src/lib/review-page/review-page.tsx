import React, { useState } from 'react';
import { ReviewPageProps } from '../NavigationTypes/navigation-types';
import { RatingCard, ReviewCard} from '@carpool/client/components';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';

export function ReviewPage({ navigation }: ReviewPageProps) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(true);
  const changeToReview = () => {
    console.log("Change from Rating to Review Modal")
    setModalVisible(true)
    setModalVisible2(false)

  };
  const reviewToNothing = () => {
    console.log("Change from Review Modal to Nothing")
    setModalVisible(false)
    navigation.navigate('HomePage');
  };
  return (
    <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ReviewCard />
            <TouchableOpacity
              style={[styles.container]}
              onPress={reviewToNothing}
            >
              <Text style={styles.text}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible2}>
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <RatingCard/>
          <TouchableOpacity
            onPress={changeToReview}
            style={[styles.container,]}>
            <Text style={styles.text}>Rate</Text>
         </TouchableOpacity>
          </View>
        </View>


      </Modal>

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
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: '8%',
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
  }
});

export default ReviewPage;

