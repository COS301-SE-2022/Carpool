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
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderWidth: 2,
    margin:10,
    borderColor: '#188aed',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  container2: {
    backgroundColor: '#188aed',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
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
    backgroundColor: '#f8f8f8',
    padding: 20,
    margin: 10,
    borderRadius: 25,
  },
  centeredView: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: '8%',
    width: '100%',
    padding: 10,
    marginHorizontal:'10%',
    borderRadius: 15
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
