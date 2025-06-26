import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "./SpiderGame";
import { CardComponent } from "./CardComponent";
import styles from "../../screens/spider/column-styles";

interface Props {
  cards: Card[];
  columnIndex: number;
  onCardPress: (card: Card, fromColumn: number) => void;
  onColumnPress: (toColumn: number) => void;
  selectedCardId?: string;
}

export const Column: React.FC<Props> = ({
  cards,
  columnIndex,
  onCardPress,
  onColumnPress,
  selectedCardId,
}) => {
  return (
    <TouchableOpacity onPress={() => onColumnPress(columnIndex)}>
      <View style={styles.column}>
        {cards.map((card, index) => {
          const isTop = index === cards.length - 1;
          const isSelected = card.id === selectedCardId;

          return (
            <CardComponent
              key={card.id}
              card={card}
              faceUp={card.faceUp}
              containerStyle={[
                index === 0 ? styles.cardMarginFirst : styles.cardMargin,
                isSelected ? { borderColor: "yellow", borderWidth: 2 } : {},
              ]}
              onPress={() => {
                if (!selectedCardId) {
                  if (isTop && card.faceUp) onCardPress(card, columnIndex);
                } else {
                  onColumnPress(columnIndex); // tenta mover para essa coluna
                }
              }}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};
