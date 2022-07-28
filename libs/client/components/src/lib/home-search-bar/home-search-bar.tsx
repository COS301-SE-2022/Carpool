import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './home-search-bar.style';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
// import { HomePageProps } from '@carpool/client/pages';

type props = {
  onPress: () => void;
};

export function HomeSearchBar({ onPress }: props) {
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



    </View>
  );
}

export default HomeSearchBar;
