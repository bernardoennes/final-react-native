import React from "react";
import { View, Text } from "react-native";
import CardList from "../../../../components/CardList/cardList";
import styles from "../escopa-styles";
import { Card } from "../../../../hooks/useDrawCard";

const Table = ({ cards, selected, onPress }: {
  cards: Card[], selected: Card[], onPress: (card: Card) => void
}) => (
  <View style={styles.tableArea}>
    <Text style={styles.sectionTitle}>MESA:</Text>
    <CardList
      cards={cards}
      onCardPress={onPress}
      selectedCards={selected}
      selectedStyle={{ borderWidth: 3, borderColor: "red" }}
    />
  </View>
);

export default Table;
