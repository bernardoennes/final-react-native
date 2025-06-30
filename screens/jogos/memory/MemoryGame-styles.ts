// MemoryGame-styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const COLUMNS = 4;
const GAP = 8;

const CARD_WIDTH = (width - 32 - GAP * (COLUMNS + 1)) / COLUMNS;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

export default StyleSheet.create({
  /* --- novo estilo de fundo --- */
  background: {
    flex: 1,
    resizeMode: "cover", // cobre toda a tela
  },

  /* --- substituído: antes era vermelho --- */
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  /* --- o restante permanece igual --- */
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "pink",
    textAlign: "center",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: GAP / 2,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  cardUp: {
    backgroundColor: "blue",
  },
  cardDown: {
    backgroundColor: "#1E4E6A",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cardBackImage: {
    width: "130%",
    height: "120%",
    resizeMode: "contain",
  },

  wonBox: {
    alignItems: "center",
    marginBottom: 16,
  },
  wonText: {
    fontSize: 20,
    color: "#ffff",
    marginBottom: 8,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFCC00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  movesText: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 14,
  },
});
