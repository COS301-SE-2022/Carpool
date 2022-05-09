/* eslint-disable-next-line */
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  onChangeText: (text: string) => void;
  inputValue: string;
  inputPlaceholder: string;
  iconName: string;
};

export function Input({
  onChangeText,
  inputPlaceholder,
  inputValue,
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
      <Icon
        name={iconName}
        size={22}
        style={{ flex: 1, color: '#808080', marginRight: 8 }}
      />
      <TextInput
        value={inputValue}
        placeholder={inputPlaceholder}
        onChangeText={onChangeText}
        style={styles.input}
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
    flex: 10,
  },
});

export default Input;
