import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
 backgroundImage: {
  flex: 1,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
},
  logoContainer: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 12,
  },
  logo: {
    width: 160,
    height: 120,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  homeFloatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    backgroundColor: "#000000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  homeIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },

    card: {
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },

});

export default styles;
