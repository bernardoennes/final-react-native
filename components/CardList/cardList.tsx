import React from "react";
import { ScrollView } from "react-native";
import { Card } from "../../hooks/useDrawCard";
import CardButton from "../CardButton/cardButton";
import styles from "./cardList-styles";

interface CardListProps {
  cards: Card[];
  onCardPress: (card: Card) => void;
  selectedCards?: Card[] | Card | null;
  selectedStyle?: object;
}

const CardList = ({ cards, onCardPress, selectedCards, selectedStyle }: CardListProps) => (
  <ScrollView horizontal style={styles.cardsScroll}>
    {cards.map((card, index) => {
      let selected = false;
      if (Array.isArray(selectedCards)) {
        selected = selectedCards.some(c => c.code === card.code);
      } else if (selectedCards && "code" in selectedCards) {
        selected = selectedCards.code === card.code;
      }
      return (
        <CardButton
          key={index}
          card={card}
          onPress={onCardPress}
          selected={selected}
          selectedStyle={selectedStyle}
        />
      );
    })}
  </ScrollView>
);

export default CardList;