import { StyleSheet } from 'react-native';
import { colors } from '@carpool/client/shared/utilities';

export const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 30,
    zIndex: 20,
    position: 'absolute',
    width: '95%',
    top: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 30,
    marginVertical: 15,
    width: '100%',
    backgroundColor: colors.white,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  inputText: {
    color: colors.grey,
    fontWeight: '300',
    fontSize: 16,
    maxWidth: '75%',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  iconStyle: {
    paddingLeft: 5,
    color: colors.blue,
  },
});
