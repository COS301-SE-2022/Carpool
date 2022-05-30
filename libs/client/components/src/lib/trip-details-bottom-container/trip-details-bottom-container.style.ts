import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 18,
  },
  textMediumLight: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 5,
  },
  chatButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
  },
});
