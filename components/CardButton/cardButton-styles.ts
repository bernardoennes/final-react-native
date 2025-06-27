import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardTouchable: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: "black",
    width: 60,
    height: 90,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },
  cardSelectedRed: {
    borderWidth: 3,
    borderColor: "red",
  },
  cardSelectedBlue: {
    borderWidth: 3,
    borderColor: "blue",
  },
  cardDefault: {
    borderWidth: 1,
    borderColor: "black",
  },
  cardImage: {
    width: 60,
    height: 80,
  },
  cardValue: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default styles;