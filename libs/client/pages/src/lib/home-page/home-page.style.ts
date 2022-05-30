import { StyleSheet } from 'react-native';
import { colors } from '@carpool/client/shared/utilities';

export const styles = StyleSheet.create({
  bottomContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'space-around',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigText: {
    textAlign: 'center',
    color: colors.blue,
    fontWeight: '600',
    fontSize: 18,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  smallTextBlack: {
    paddingTop: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  noTripContainer: {
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
