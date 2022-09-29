import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type UserProfileItemTypes = {
  title: string;
  onPress: () => void;
  count?: string;
  icon: React.ReactNode;
};

export function UserProfileItem({
  title,
  onPress,
  count,
  icon,
}: UserProfileItemTypes) {
  return (
    <Pressable
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: '#f5f5f5',
          padding: 3,
          borderRadius: 5,
          flex: 1,
        }}
      >
        {icon}
      </View>
      <View
        style={{
          flex: 12,
          paddingLeft: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: '500', fontSize: 15 }}>{title}</Text>
        {count && (
          <View
            style={{
              backgroundColor: '#188aed',
              borderRadius: 50,
              zIndex: 10,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 13,
                fontWeight: '700',
              }}
            >
              {count}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          padding: 3,
          borderRadius: 20,
          flex: 1,
        }}
      >
        <Icon
          name="chevron-right"
          size={25}
          style={{
            color: '#000',
          }}
        />
      </View>
    </Pressable>
  );
}

export default UserProfileItem;
