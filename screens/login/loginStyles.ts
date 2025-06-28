import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logo:{
    width:140,
    height:140,
    resizeMode:"contain",
    marginBottom:20,
},

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    padding: 30,
    margin: 20,
    borderRadius: 16,
    alignItems: "center",
    width:"90%",
    shadowColor:"#000",


  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "#fff",
  },
  email: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4B5320",
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
