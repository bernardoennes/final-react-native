import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    minHeight: '100%',
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  cardRow: {
    height: 130,
    marginVertical: 8,
  },
  card: {
    width: 80,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: 4,
  },
  result: {
    fontSize: 24,
    textAlign: "center",
    color: "gold",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    color: "#fff",
  },
});

export default styles;
