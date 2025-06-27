import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { Card } from "../../hooks/useDrawCard";
import styles from "./cardButton-styles";

interface CardButtonProps {
  card: Card;
  onPress: (card: Card) => void;
  selected?: boolean;
  selectedStyle?: object;
}

const CardButton = ({ card, onPress, selected, selectedStyle }: CardButtonProps) => (
  <TouchableOpacity
    onPress={() => onPress(card)}
    style={[
      styles.cardTouchable,
      selected ? selectedStyle : styles.cardDefault,
    ]}
  >
    <Image source={{ uri: card.image }} style={styles.cardImage} />
    <Text style={styles.cardValue}>{card.value}</Text>
  </TouchableOpacity>
);

export default CardButton;