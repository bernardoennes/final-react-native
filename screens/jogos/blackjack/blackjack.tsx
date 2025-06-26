import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useDeck } from "../../../hooks/useDeck";
import { useDrawCard, Card } from "../../../hooks/useDrawCard";
import styles from "./blackjack-styles";
import GameButton from "../../../components/GameButton/gameButton";
import Loading from "../../../components/Loading/loading";

const Blackjack: React.FC = () => {
  const { deckId, loadDeck } = useDeck(6);
  const { drawCard } = useDrawCard();
  const [player, setPlayer] = useState<Card[]>([]);
  const [dealer, setDealer] = useState<Card[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    setLoading(true);
    try {
      const newDeckId = await loadDeck();
      const cards = await drawCard(newDeckId, 4);

      setPlayer([cards[0], cards[2]]);
      setDealer([cards[1], cards[3]]);
      setMsg("");
      setGameOver(false);
    } catch (err) {
      console.error("Erro ao carregar cartas:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = (cards: Card[]): number => {
    let total = 0,
      aces = 0;
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

  const handleDrawCard = async () => {
    if (!deckId) return;
    const newCards = await drawCard(deckId, 1);
    const newPlayerHand = [...player, newCards[0]];
    setPlayer(newPlayerHand);
    if (getTotal(newPlayerHand) > 21) {
      setMsg("Você perdeu!");
      setGameOver(true);
    }
  };

  const stop = async () => {
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

  const CardRow: React.FC<{ cards: Card[] }> = ({ cards }) => (
    <View style={styles.cardRow}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cards.map((c: Card, i: number) => (
          <Image key={i} source={{ uri: c.image }} style={styles.card} />
        ))}
      </ScrollView>
    </View>
  );

  if (loading || !player.length || !dealer.length) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>

      <Text style={styles.text}>Suas cartas ({getTotal(player)})</Text>
      <CardRow cards={player} />

      <Text style={styles.text}>
        Casa ({gameOver ? getTotal(dealer) : "?"})
      </Text>
      <CardRow
        cards={
          gameOver
            ? dealer
            : [
                ...dealer.slice(0, -1),
                {
                  ...dealer[dealer.length - 1],
                  image: "https://deckofcardsapi.com/static/img/back.png",
                },
              ]
        }
      />

      {!gameOver && (
        <>
          <GameButton onPress={handleDrawCard}>Pedir Carta</GameButton>
          <GameButton onPress={stop}>Parar</GameButton>
        </>
      )}

      {msg !== "" && (
        <>
          <Text style={styles.result}>{msg}</Text>
          <GameButton onPress={startGame}>Jogar Novamente</GameButton>
        </>
      )}
    </SafeAreaView>
  );
};

export default Blackjack;
