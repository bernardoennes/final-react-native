import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#353535",
    padding: 14,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    width: 220,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default styles;