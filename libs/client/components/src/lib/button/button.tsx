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
  marginBottom,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  colour?: string;
  marginBottom?: number;
}) {
  if (colour === '#282D46') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container2, { marginBottom: marginBottom || 0 }]}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {
            marginBottom: marginBottom || 0,
            backgroundColor: colour || '#188aed',
          },
        ]}
      >
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
