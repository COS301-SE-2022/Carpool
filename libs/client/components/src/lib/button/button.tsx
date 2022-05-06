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
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#188aed',
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
