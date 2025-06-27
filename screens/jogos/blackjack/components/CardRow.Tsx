import React from "react";
import { View, Image, ScrollView } from "react-native";
import styles from "../blackjack-styles";
import { Card } from "../../../../hooks/useDrawCard";

interface CardRowProps {
  cards: Card[];
}

const CardRow: React.FC<CardRowProps> = ({ cards }) => (
  <View style={styles.cardRow}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cards.map((c: Card, i: number) => (
        <Image key={i} source={{ uri: c.image }} style={styles.card} />
      ))}
    </ScrollView>
  </View>
);

export default CardRow;