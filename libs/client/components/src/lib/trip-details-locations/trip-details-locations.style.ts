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
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  line: {
    width: 4,
    flex: 3.1,
    backgroundColor: '#188aed',
    marginLeft: -0.8,
  },
  startIcon: {
    flex: 1,
    color: '#188aed',
    zIndex: 200,
  },
  endIcon: {
    flex: 1.2,
    marginTop: -4,
    color: '#188aed',
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 18,
  },
});
