import { Card } from "../../../../hooks/useDrawCard";

export function useStop(deckId: string | null, dealer: Card[], setDealer: (cards: Card[]) => void, player: Card[], drawCard: any, getTotal: (cards: Card[]) => number, setMsg: (msg: string) => void, setGameOver: (over: boolean) => void) {
  return async () => {
    if (!deckId) return;
    let newDealer = [...dealer];
    while (getTotal(newDealer) < 17) {
      const res = await drawCard(deckId, 1);
      newDealer.push(res[0]);
    }
    setDealer(newDealer);
    const pt = getTotal(player);
    const dt = getTotal(newDealer);
    let result = "";
    if (dt > 21 || pt > dt) result = "Você venceu!";
    else if (pt < dt) result = "Dealer venceu!";
    else result = "Empate!";
    setMsg(result);
    setGameOver(true);
  };
}