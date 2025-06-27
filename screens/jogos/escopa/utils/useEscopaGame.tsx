import { useEffect, useState } from "react";
import { useDeck } from "../../../../hooks/useDeck";
import { useDrawCard, Card } from "../../../../hooks/useDrawCard";

export const useEscopaGame = () => {
  const { deckId, loadDeck } = useDeck(1);
  const { drawCard } = useDrawCard();
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [tableCards, setTableCards] = useState<Card[]>([]);
  const [playerCaptured, setPlayerCaptured] = useState<Card[]>([]);
  const [dealerCaptured, setDealerCaptured] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedTableCards, setSelectedTableCards] = useState<Card[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [playerEscopas, setPlayerEscopas] = useState<number>(0);
  const [dealerEscopas, setDealerEscopas] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const startGame = async () => {
    setLoading(true);
    try {
      const newDeckId = await loadDeck();
      const cards = await drawCard(newDeckId, 10);

      setPlayerHand(cards.slice(0, 3));
      setDealerHand(cards.slice(3, 6));
      setTableCards(cards.slice(6, 10));
      setPlayerCaptured([]);
      setDealerCaptured([]);
      setPlayerEscopas(0);
      setDealerEscopas(0);
      setSelectedCard(null);
      setSelectedTableCards([]);
      setIsPlayerTurn(true);
      setGameOver(false);
      setMessage("");
    } catch (err) {
      setMessage("Erro ao carregar cartas");
    } finally {
      setLoading(false);
    }
  };

  return {
    deckId, loading, message, gameOver,
    playerHand, dealerHand, tableCards,
    selectedCard, selectedTableCards,
    playerCaptured, dealerCaptured,
    playerEscopas, dealerEscopas,
    isPlayerTurn,
    setSelectedCard, setSelectedTableCards, setMessage, startGame,
  };
};
