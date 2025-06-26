import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "#0f4c75",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3282b8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    flexWrap: "nowrap",
    overflow: "visible",
    flexGrow: 0,
    marginBottom: 20,
    paddingHorizontal: 8,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  stockButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  buttonSmall: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3282b8",
    marginHorizontal: 4,
  },
  buttonSmallDisabled: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 10,
    gap: 8,
  },
});

export default styles;
