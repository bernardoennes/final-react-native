import { Card } from "../../../../hooks/useDrawCard";

export function useGetTotal() {
  return (cards: Card[]): number => {
    let total = 0, aces = 0;
    cards.forEach((c: Card) => {
      if (["KING", "QUEEN", "JACK"].includes(c.value)) total += 10;
      else if (c.value === "ACE") {
        total += 11;
        aces++;
      } else total += parseInt(c.value);
    });
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }
    return total;
  };
}