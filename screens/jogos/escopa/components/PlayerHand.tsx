import React from "react";
import { View, Text } from "react-native";
import CardList from "../../../../components/CardList/cardList";
import styles from "../escopa-styles";
import { Card } from "../../../../hooks/useDrawCard";

const PlayerHand = ({ cards, selected, onPress }: {
  cards: Card[], selected: Card | null, onPress: (card: Card) => void
}) => (
  <View>
    <Text style={styles.sectionTitle}>SUAS CARTAS:</Text>
    <View style={styles.playerHandRow}>
      <CardList
        cards={cards}
        onCardPress={onPress}
        selectedCards={selected}
        selectedStyle={{ borderWidth: 3, borderColor: "blue" }}
      />
    </View>
  </View>
);

export default PlayerHand;
