/* eslint-disable-next-line */
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onChangeText: (text: string) => void;
  inputValue: string;
  inputPlaceholder: string;
  iconOneName: string;
  iconTwoName: string;
};

export function PasswordInput({
  onChangeText,
  inputPlaceholder,
  inputValue,
  iconOneName,
  iconTwoName,
}: Props) {
  const [showPass, setShowPass] = useState(false);

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
        name={iconOneName}
        size={22}
        style={{
          flex: 1,
          color: '#808080',
          marginRight: 8,
        }}
      />
      <View
        style={{
          flex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#808080',
            borderBottomWidth: 1,
            marginVertical: 8,
          }}
        >
          <TextInput
            value={inputValue}
            placeholder={inputPlaceholder}
            onChangeText={onChangeText}
            style={styles.passwordInput}
            secureTextEntry={showPass ? false : true}
            placeholderTextColor="#808080"
            autoCapitalize="none"
          />
          <Icon
            name={iconTwoName}
            size={20}
            style={{ color: '#808080', marginRight: 5 }}
            onPress={() => setShowPass(!showPass)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordInput: {
    height: 40,
    paddingLeft: 5,
    flex: 10,
  },
});

export default PasswordInput;
