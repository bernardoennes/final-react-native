import { useCallback } from "react";
import { Card } from "../../../../hooks/useDrawCard";

interface UsePlayCardParams {
  selectedCard: Card | null;
  isPlayerTurn: boolean;
  selectedTableCards: Card[];
  setMessage: (msg: string) => void;
  tableCards: Card[];
}

const getCardValue = (card: Card): number => {
  if (card.value === "KING") return 10;
  if (card.value === "QUEEN") return 9;
  if (card.value === "JACK") return 8;
  if (card.value === "ACE") return 1;
  return parseInt(card.value);
};

export function usePlayCard({
  selectedCard,
  isPlayerTurn,
  selectedTableCards,
  setMessage,
  tableCards,
}: UsePlayCardParams) {
  return useCallback(() => {
    if (!selectedCard || !isPlayerTurn) return;

    const playedValue = getCardValue(selectedCard);
    let capturedCards: Card[] = [];

    if (selectedTableCards.length > 0) {
      const selectedSum = selectedTableCards.reduce(
        (sum, card) => sum + getCardValue(card),
        0
      );
      if (selectedSum === playedValue) {
        capturedCards = [...selectedTableCards];
      } else {
        setMessage("Soma inválida!");
        return;
      }
    } else {
      const matchingCard = tableCards.find(
        (card) => getCardValue(card) === playedValue
      );
      if (matchingCard) {
        capturedCards = [matchingCard];
      }
    }
  }, [selectedCard, isPlayerTurn, selectedTableCards, setMessage, tableCards]);
}
