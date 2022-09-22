import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    flex: 3,
    display: 'flex',
    zIndex: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
  // flexRow: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // },
  topBar: {
    backgroundColor: '#188aed',
    flex: 0.6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 35,
    marginBottom: -10,
    paddingHorizontal: 30,
    zIndex: 20,
  },
  textLargeWhite: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 5,
  },
  textSmallWhite: {
    color: '#fff',
    fontWeight: '500',
    maxWidth: '80%',
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    borderRadius: 40,
    padding: 10,
  },
});
