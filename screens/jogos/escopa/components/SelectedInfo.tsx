import React from "react";
import { View, Text } from "react-native";
import { Card } from "../../../../hooks/useDrawCard";
import styles from "../escopa-styles";

const SelectedInfo = ({ card, tableCards }: {
  card: Card | null, tableCards: Card[]
}) => {
  if (!card) return null;

  return (
    <View style={styles.selectedCardBox}>
      <Text>Carta selecionada: {card.value} de {card.suit}</Text>
      {tableCards.length > 0 && (
        <Text>Cartas da mesa selecionadas: {tableCards.length}</Text>
      )}
    </View>
  );
};

export default SelectedInfo;
