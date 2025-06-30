import uuid from "react-native-uuid";
import { Card } from "../screens/spider/SpiderGame";

export function createSpiderDeck(level: "easy" | "medium" | "hard"): Card[] {
  const suits = {
    easy: ["SPADES"],
    medium: ["SPADES", "HEARTS"],
    hard: ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"],
  };

  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const selectedSuits = suits[level];
  const cardsPerSuit = values.length;
  const totalCardsPerDeck = selectedSuits.length * cardsPerSuit;

  // Calcula quantas cópias são necessárias para atingir 104 cartas
  const copies = 104 / totalCardsPerDeck;

  const fullDeck: Card[] = [];

  for (let c = 0; c < copies; c++) {
    for (const suit of selectedSuits) {
      for (const value of values) {
        const code = value + suit[0]; // ex: "10S"
        const image = `https://deckofcardsapi.com/static/img/${value}${suit[0]}.png`;

        fullDeck.push({
          id: uuid.v4().toString(),
          code,
          suit,
          value,
          image,
        });
      }
    }
  }
  if (fullDeck.length !== 104) {
    console.warn("⚠️ O baralho gerado não tem 104 cartas!", fullDeck.length);
  }

  return fullDeck.sort(() => Math.random() - 0.5); // embaralhar
}
