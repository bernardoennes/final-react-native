import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDeck } from "../../../hooks/useDeck";
import { useDrawCard, Card } from "../../../hooks/useDrawCard";
import styles from "./blackjack-styles";
import CardList from "../../../components/CardList/cardList";

const Blackjack = () => {
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

  if (loading || !player.length || !dealer.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff" }}>Carregando cartas...</Text>
      </View>
    );
  }

  const dealerCardsToShow = gameOver
    ? dealer
    : [
        ...dealer.slice(0, -1),
        {
          ...dealer[dealer.length - 1],
          image: "https://deckofcardsapi.com/static/img/back.png",
        },
      ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>

      <Text style={styles.text}>Suas cartas ({getTotal(player)})</Text>
      <CardList cards={player} onCardPress={() => {}} />

      <Text style={styles.text}>
        Casa ({gameOver ? getTotal(dealer) : "?"})
      </Text>
      <CardList cards={dealerCardsToShow} onCardPress={() => {}} />

      {!gameOver && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleDrawCard}>
            <Text style={styles.buttonText}>Pedir Carta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Parar</Text>
          </TouchableOpacity>
        </>
      )}

      {msg !== "" && (
        <>
          <Text style={styles.result}>{msg}</Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Blackjack;
