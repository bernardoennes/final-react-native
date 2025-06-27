import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useDeck } from "../../../hooks/useDeck";
import { useDrawCard, Card } from "../../../hooks/useDrawCard";
import styles from "./blackjack-styles";
import GameButton from "../../../components/GameButton/gameButton";
import Loading from "../../../components/Loading/loading";

import { useGetTotal } from "./utils/getTotal";
import { useHandleDrawCard } from "./utils/handleDrawCard";
import { useStop } from "./utils/stop";
import CardRow from "./components/CardRow";

const Blackjack = () => {
  const { deckId, loadDeck } = useDeck(6);
  const { drawCard } = useDrawCard();
  const [player, setPlayer] = useState<Card[]>([]);
  const [dealer, setDealer] = useState<Card[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getTotal = useGetTotal();
  const handleDrawCard = useHandleDrawCard(deckId, player, setPlayer, drawCard, getTotal, setMsg, setGameOver);
  const stop = useStop(deckId, dealer, setDealer, player, drawCard, getTotal, setMsg, setGameOver);

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
          gameOver ? dealer : [...dealer.slice(0, -1),
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
