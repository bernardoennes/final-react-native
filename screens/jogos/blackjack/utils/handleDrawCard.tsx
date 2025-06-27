import { Card } from "../../../../hooks/useDrawCard";

export function useHandleDrawCard(deckId: string | null, player: Card[], setPlayer: (cards: Card[]) => void, drawCard: any, getTotal: (cards: Card[]) => number, setMsg: (msg: string) => void, setGameOver: (over: boolean) => void) {
  return async () => {
    if (!deckId) return;
    const newCards = await drawCard(deckId, 1);
    const newPlayerHand = [...player, newCards[0]];
    setPlayer(newPlayerHand);
    if (getTotal(newPlayerHand) > 21) {
      setMsg("Você perdeu!");
      setGameOver(true);
    }
  };
}