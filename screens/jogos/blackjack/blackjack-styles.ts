import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    minHeight: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 18,
    color: "#FFD700", 
    fontWeight: "bold",
    letterSpacing: 2,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  text: {
    fontSize: 16,
    color: "#e0e0e0",
    marginTop: 10,
    textAlign: "center",
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
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  result: {
    fontSize: 24,
    textAlign: "center",
    color: "#FFD700",
    marginVertical: 20,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
});

export default styles;
