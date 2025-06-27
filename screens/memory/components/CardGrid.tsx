import React from "react";
import { View } from "react-native";
import Card from "./Card";
import { Card as CardType } from "../hooks/useMemoryGame";
import styles from "../MemoryGame-styles";

interface Props {
  cards: CardType[];
  onFlip: (card: CardType) => void;
}

export default function CardGrid({ cards, onFlip }: Props) {
  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <Card key={card.id} {...card} onFlip={() => onFlip(card)} />
      ))}
    </View>
  );
}
