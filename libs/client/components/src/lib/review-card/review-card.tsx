/* eslint-disable-next-line */
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


export function ReviewCard(){
  return (
    <View>
    <TextInput
      multiline
      numberOfLines={3}
      style={styles.input}
      placeholder="(Optional) Tell us about your experience"
      underlineColorAndroid="transparent"
    />
  </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderWidth: 1.5,
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
    fontSize: 12,
    fontWeight: '500',
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
  shadow: {
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

export default ReviewCard;
