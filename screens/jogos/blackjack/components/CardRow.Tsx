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
        <Image
          key={i}
          // Trecho que tive que mecher porque as cartas são URLs, mas a parte de tras é um jpg
          source={typeof c.image === "string" ? { uri: c.image } : c.image}
          style={styles.card}
        />
      ))}
    </ScrollView>
  </View>
);

export default CardRow;