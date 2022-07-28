import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './home-search-bar.style';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';

type props = {
  onPress: () => void;
  onPressCart: () => void;
};

export function HomeSearchBar({ onPress, onPressCart }: props) {
  return (
    <View style={styles.searchBarContainer}>
      <View style={[styles.searchBar, styles.shadow]}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flex: 6,
          }}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 5,
              },
            ]}
          >
            <Icons name="search" size={25} style={styles.iconStyle} />
            <Text style={styles.inputText} numberOfLines={1}>
              Where are you going?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#188aed',
          padding: 12,
          borderRadius: 50,
          marginLeft: 10,
        }}
      >
        <Icon
          name="shopping-cart"
          size={20}
          style={{ color: '#fff' }}
          onPress={onPressCart}
        />
      </View>
    </View>
  );
}

export default HomeSearchBar;
