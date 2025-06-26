import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /*
  container: {
    // flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  */
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  email: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: "90%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
  },
  logoutButton: {
    backgroundColor: "#cc0000",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
