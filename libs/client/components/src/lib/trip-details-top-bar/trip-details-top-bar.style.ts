import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topBar: {
    backgroundColor: '#188aed',
    flex: 0.9,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
    marginBottom: -10,
    paddingHorizontal: 30,
    zIndex: 20,
  },
  textLargeWhite: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 5,
  },
  textSmallWhite: {
    color: '#fff',
    fontWeight: '500',
    maxWidth: '80%',
    lineHeight: 20,
  },
});
