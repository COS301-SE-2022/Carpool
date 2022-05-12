/* eslint-disable-next-line */
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onChangeTextOne: (text: string) => void;
  onChangeTextTwo: (text: string) => void;
  inputOneValue: string;
  inputOnePlaceholder: string;
  inputTwoValue: string;
  inputTwoPlaceholder: string;
  iconName: string;
};

export function InlineInputs({
  onChangeTextOne,
  onChangeTextTwo,
  inputOnePlaceholder,
  inputOneValue,
  inputTwoPlaceholder,
  inputTwoValue,
  iconName,
}: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Icons
        name={iconName}
        size={22}
        style={{ flex: 1, color: '#808080', marginRight: 8 }}
      />
      <TextInput
        value={inputOneValue}
        placeholder={inputOnePlaceholder}
        onChangeText={onChangeTextOne}
        style={styles.input}
        placeholderTextColor="#808080"
        autoCapitalize="none"
      />
      <TextInput
        value={inputTwoValue}
        placeholder={inputTwoPlaceholder}
        onChangeText={onChangeTextTwo}
        style={styles.inputMargin}
        placeholderTextColor="#808080"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 8,
    padding: 8,
    paddingLeft: 5,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flex: 4,
  },
  inputMargin: {
    height: 40,
    marginVertical: 8,
    padding: 8,
    paddingLeft: 5,
    marginLeft: 10,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flex: 4,
  },
});

export default InlineInputs;
