import { useCallback } from "react";
import { Card } from "../../../../hooks/useDrawCard";

interface UsePlayCardParams {
  selectedCard: Card | null;
  isPlayerTurn: boolean;
  selectedTableCards: Card[];
  setMessage: (msg: string) => void;
  tableCards: Card[];
  playerHand: Card[];
  setPlayerHand: (cards: Card[]) => void;
  setTableCards: (cards: Card[]) => void;
  setSelectedCard: (card: Card | null) => void;
  setSelectedTableCards: (cards: Card[]) => void;
  playerCaptured: Card[];
  setPlayerCaptured: (cards: Card[]) => void;
  dealerPlay: () => void;
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
  playerHand,
  setPlayerHand,
  setTableCards,
  setSelectedCard,
  setSelectedTableCards,
  playerCaptured,
  setPlayerCaptured,
  dealerPlay
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

    if (capturedCards.length > 0) {
      setTableCards(
        tableCards.filter(
          (c) => !capturedCards.some((cap) => cap.code === c.code)
        )
      );
      setPlayerCaptured([...playerCaptured, selectedCard, ...capturedCards]);
    } else {
      setTableCards([...tableCards, selectedCard]);
    }


    setPlayerHand(playerHand.filter((c) => c.code !== selectedCard.code));
    setSelectedCard(null);
    setSelectedTableCards([]);

    setTimeout(() => {
      dealerPlay();
    }, 700);
  }, [
    selectedCard, isPlayerTurn, selectedTableCards, setMessage,
    tableCards, playerHand, setPlayerHand, setTableCards,
    setSelectedCard, setSelectedTableCards, playerCaptured, setPlayerCaptured,
    dealerPlay, 
  ]);
}
