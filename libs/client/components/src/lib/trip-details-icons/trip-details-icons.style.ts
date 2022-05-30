import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconRow: {
    flex: 1,
    borderTopColor: '#808080',
    borderTopWidth: 0.3,
    borderBottomColor: '#808080',
    borderBottomWidth: 0.3,
  },
  iconContainer: {
    borderRightWidth: 0.3,
    borderRightColor: '#808080',
    padding: 10,
  },
  textMediumBlack: {
    fontWeight: '700',
    fontSize: 12,
  },
});
