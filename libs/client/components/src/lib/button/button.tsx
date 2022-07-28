import { background } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';

export function Button({
  onPress,
  title,
  colour,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  colour?: string;
}) {
  if(colour==="#282D46") {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container2}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }else{
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#188aed',
    width: '100%',
    padding: 12,
    borderRadius: 25,
  },
  container2: {
    backgroundColor: '#282D46',
    width: '100%',
    padding: 12,
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Button;
