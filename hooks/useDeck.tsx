import { useState, useCallback } from "react";
import axios from "axios";

export function useDeck(deckCount: number = 1) {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadDeck = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
      );
      setDeckId(res.data.deck_id);
      return res.data.deck_id as string;
    } finally {
      setLoading(false);
    }
  }, [deckCount]);

  return { deckId, loadDeck, loading };
}