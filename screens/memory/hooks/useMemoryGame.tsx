import { useState, useEffect } from "react";
import { useDeck } from "../../../hooks/useDeck";
import { useDrawCard, Card as ApiCard } from "../../../hooks/useDrawCard";

const DEFAULT_PAIRS = 8;

export interface Card extends ApiCard {
  id: string;
  faceUp: boolean;
  matched: boolean;
}

function duplicateAndShuffle(apiCards: ApiCard[]): Card[] {
  const dup = apiCards.flatMap((c) => [
    { ...c, id: `${c.code}-1`, faceUp: false, matched: false },
    { ...c, id: `${c.code}-2`, faceUp: false, matched: false },
  ]);
  for (let i = dup.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dup[i], dup[j]] = [dup[j], dup[i]];
  }
  return dup;
}

export function useMemoryGame(pairs: number = DEFAULT_PAIRS) {
  const { loadDeck, loading: loadingDeck } = useDeck();
  const { drawCard, loading: loadingDraw } = useDrawCard();

  const [cards, setCards] = useState<Card[]>([]);
  const [first, setFirst] = useState<Card | null>(null);
  const [second, setSecond] = useState<Card | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(true);

  const loadGame = async () => {
    try {
      setInternalLoading(true);
      setError(null);
      setWon(false);
      setMoves(0);
      setFirst(null);
      setSecond(null);
      setCards([]);

      const deckId = await loadDeck();
      const apiCards = await drawCard(deckId, pairs);
      setCards(duplicateAndShuffle(apiCards));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    loadGame(); // chamada única
  }, []);

  const flipCard = (card: Card) => {
    if (card.faceUp || card.matched || second || won) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, faceUp: true } : c))
    );

    if (!first) {
      setFirst(card);
    } else {
      setSecond(card);
      setMoves((m) => m + 1);
    }
  };

  useEffect(() => {
    if (!first || !second) return;

    const isMatch = first.code === second.code;

    const timer = setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => {
          if (c.id === first.id || c.id === second.id) {
            return isMatch ? { ...c, matched: true } : { ...c, faceUp: false };
          }
          return c;
        })
      );
      setFirst(null);
      setSecond(null);
    }, 600);

    return () => clearTimeout(timer);
  }, [first, second]);

  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setWon(true);
    }
  }, [cards]);

  const loading = loadingDeck || loadingDraw || internalLoading;

  return {
    cards,
    moves,
    won,
    loading,
    error,
    flipCard,
    restart: loadGame,
  };
}
