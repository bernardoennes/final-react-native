import { useState } from "react";
import axios from "axios";

export interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

export function useDrawCard() {
  const [loading, setLoading] = useState(false);

  const drawCard = async (deckId: string, count: number = 1): Promise<Card[]> => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
      );
      return res.data.cards as Card[];
    } finally {
      setLoading(false);
    }
  };

  return { drawCard, loading };
}