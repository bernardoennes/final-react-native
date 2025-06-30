import { useCallback } from "react";
import { Card } from "../../../../hooks/useDrawCard";

const getCardValue = (card: Card): number => {
  if (card.value === "KING") return 10;
  if (card.value === "QUEEN") return 9;
  if (card.value === "JACK") return 8;
  if (card.value === "ACE") return 1;
  return parseInt(card.value);
};

interface UseDealerPlayParams {
  dealerHand: Card[];
  tableCards: Card[];
  setDealerHand: (cards: Card[]) => void;
  setTableCards: (cards: Card[]) => void;
  setDealerCaptured: (cards: Card[]) => void;
  dealerCaptured: Card[];
  setIsPlayerTurn: (b: boolean) => void;
}

export function useDealerPlay({
  dealerHand,
  tableCards,
  setDealerHand,
  setTableCards,
  setDealerCaptured,
  dealerCaptured,
  setIsPlayerTurn,
}: UseDealerPlayParams) {
  return useCallback(() => {
    if (dealerHand.length === 0) {
      setIsPlayerTurn(true);
      return;
    }

    const dealerCard = dealerHand[0];
    const playedValue = getCardValue(dealerCard);
    const matchingCard = tableCards.find((card) => getCardValue(card) === playedValue);
    let capturedCards: Card[] = [];
    if (matchingCard) {
      capturedCards = [matchingCard];
    }

    let newTableCards = tableCards.filter(
      (c) => !capturedCards.some((cap) => cap.code === c.code)
    );
    if (capturedCards.length === 0) {
      newTableCards = [...newTableCards, dealerCard];
    }
    setDealerHand(dealerHand.slice(1));
    setTableCards(newTableCards);
    setDealerCaptured([...dealerCaptured, dealerCard, ...capturedCards]);
    setIsPlayerTurn(true);
  }, [
    dealerHand,
    tableCards,
    setDealerHand,
    setTableCards,
    setDealerCaptured,
    dealerCaptured,
    setIsPlayerTurn,
  ]);
}