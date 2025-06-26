import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { useDeck } from "../../../hooks/useDeck";
import { useDrawCard, Card } from "../../../hooks/useDrawCard";
import styles from "./escopa-styles";
import CardList from "../../../components/CardList/cardList";
import GameButton from "../../../components/GameButton/gameButton";
import Loading from "../../../components/Loading/loading";

const Escopa = () => {
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

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if ((playerHand.length === 0 && dealerHand.length === 0) || tableCards.length === 0) {
      endGame();
    }
  }, [playerHand, dealerHand, tableCards]);

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

  const getCardValue = (card: Card): number => {
    if (card.value === "KING") return 10;
    if (card.value === "QUEEN") return 9;
    if (card.value === "JACK") return 8;
    if (card.value === "ACE") return 1;
    return parseInt(card.value);
  };

  const handlePlayerCardPress = (card: Card) => {
    if (!isPlayerTurn || gameOver) return;
    setSelectedCard(card);
    setSelectedTableCards([]);
  };

  const handleTableCardPress = (card: Card) => {
    if (!selectedCard || !isPlayerTurn || gameOver) return;

    const isSelected = selectedTableCards.some((c) => c.code === card.code);

    if (isSelected) {
      setSelectedTableCards(selectedTableCards.filter((c) => c.code !== card.code));
    } else {
      setSelectedTableCards([...selectedTableCards, card]);
    }
  };

  const playCard = async () => {
    if (!selectedCard || !isPlayerTurn) return;

    const playedValue = getCardValue(selectedCard);
    let capturedCards: Card[] = [];

    if (selectedTableCards.length > 0) {
      const selectedSum = selectedTableCards.reduce((sum, card) => sum + getCardValue(card), 0);
      if (selectedSum === playedValue) {
        capturedCards = [...selectedTableCards];
      } else {
        setMessage("Soma inválida!");
        return;
      }
    } else {
      const matchingCard = tableCards.find((card) => getCardValue(card) === playedValue);
      if (matchingCard) {
        capturedCards = [matchingCard];
      }
    }

    const newPlayerHand = playerHand.filter((c) => c.code !== selectedCard.code);
    const newTableCards = tableCards.filter((c) => !capturedCards.some((cap) => cap.code === c.code));

    let escopa = false;
    if (capturedCards.length > 0) {
      if (newTableCards.length === 0) {
        escopa = true;
        setPlayerEscopas((prev) => prev + 1);
      }
    }

    if (capturedCards.length === 0) {
      newTableCards.push(selectedCard);
    }

    const newPlayerCaptured = [...playerCaptured, selectedCard, ...capturedCards];

    setPlayerHand(newPlayerHand);
    setTableCards(newTableCards);
    setPlayerCaptured(newPlayerCaptured);
    setSelectedCard(null);
    setSelectedTableCards([]);
    setIsPlayerTurn(false);
    setMessage(escopa ? "ESCOOPA! +1 ponto." : "");

    if (newPlayerHand.length === 0 && !gameOver) {
      const comprou = await drawMoreCards();
      if (!comprou) return;
    }

    if (!gameOver) {
      setTimeout(() => {
        dealerPlay();
      }, 1000);
    }
  };

  const dealerPlay = async () => {
    if (dealerHand.length === 0) return;

    const dealerCard = dealerHand[0];
    const playedValue = getCardValue(dealerCard);
    const matchingCard = tableCards.find((card) => getCardValue(card) === playedValue);
    const capturedCards = matchingCard ? [matchingCard] : [];

    const newDealerHand = dealerHand.slice(1);
    const newTableCards = tableCards.filter((c) => !capturedCards.some((cap) => cap.code === c.code));

    let escopa = false;
    if (capturedCards.length > 0 && newTableCards.length === 0) {
      escopa = true;
      setDealerEscopas((prev) => prev + 1);
    }

    if (capturedCards.length === 0) {
      newTableCards.push(dealerCard);
    }

    const newDealerCaptured = [...dealerCaptured, dealerCard, ...capturedCards];

    setDealerHand(newDealerHand);
    setTableCards(newTableCards);
    setDealerCaptured(newDealerCaptured);
    setIsPlayerTurn(true);
    setMessage(escopa ? "Dealer fez escopa!" : "");

    if (newDealerHand.length === 0 && !gameOver) {
      const comprou = await drawMoreCards();
      if (!comprou) return;
    }
  };

  const endGame = () => {
    const playerScore = playerCaptured.length + playerEscopas;
    const dealerScore = dealerCaptured.length + dealerEscopas;

    let result = `${playerScore} : ${playerEscopas} | ${dealerScore} : ${dealerEscopas}\n`;
    if (playerScore > dealerScore) {
      result += "Você venceu!";
    } else if (dealerScore > playerScore) {
      result += "Dealer venceu!";
    } else {
      result += "Empate!";
    }

    setMessage(result);
    setGameOver(true);
  };

  const drawMoreCards = async () => {
    if (!deckId) return false;
    const needPlayer = playerHand.length === 0;
    const needDealer = dealerHand.length === 0;
    const cardsToDraw = (needPlayer ? 3 : 0) + (needDealer ? 3 : 0);

    if (cardsToDraw === 0) return true;

    try {
      const cards = await drawCard(deckId, cardsToDraw);
      if (cards.length < cardsToDraw) {
        setMessage("O baralho acabou! Você perdeu!");
        setGameOver(true);
        return false;
      }
      if (needPlayer && needDealer) {
        setPlayerHand(cards.slice(0, 3));
        setDealerHand(cards.slice(3, 6));
      } else if (needPlayer) {
        setPlayerHand(cards.slice(0, 3));
      } else if (needDealer) {
        setDealerHand(cards.slice(0, 3));
      }
      return true;
    } catch {
      setMessage("Erro ao comprar cartas!");
      setGameOver(true);
      return false;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ESCOPA</Text>
      <Text style={styles.info}>Dealer: {dealerCaptured.length} : {dealerEscopas}</Text>
      <View style={styles.dealerHandRow}>
        {dealerHand.map((_, idx) => (
          <Image
            key={idx}
            source={{ uri: "https://deckofcardsapi.com/static/img/back.png" }}
            style={styles.dealerCard}
            resizeMode="contain"
          />
        ))}
      </View>
      <View style={styles.tableArea}>
        <Text style={styles.sectionTitle}>MESA:</Text>
        <CardList
          cards={tableCards}
          onCardPress={handleTableCardPress}
          selectedCards={selectedTableCards}
          selectedStyle={{ borderWidth: 3, borderColor: "red" }}
        />
      </View>
      <Text style={styles.sectionTitle}>SUAS CARTAS:</Text>
      <View style={styles.playerHandRow}>
        <CardList
          cards={playerHand}
          onCardPress={handlePlayerCardPress}
          selectedCards={selectedCard}
          selectedStyle={{ borderWidth: 3, borderColor: "blue" }}
        />
      </View>
      <Text style={styles.info}>Você: {playerCaptured.length} : {playerEscopas}</Text>
      {selectedCard && (
        <View style={styles.selectedCardBox}>
          <Text>Carta selecionada: {selectedCard.value} de {selectedCard.suit}</Text>
          {selectedTableCards.length > 0 && (
            <Text>Cartas da mesa selecionadas: {selectedTableCards.length}</Text>
          )}
        </View>
      )}
      {selectedCard && isPlayerTurn && !gameOver && (
        <GameButton onPress={playCard} style={styles.playButton}>
          JOGAR CARTA
        </GameButton>
      )}
      {!isPlayerTurn && !gameOver && (
        <Text style={styles.dealerTurnText}>Turno do dealer...</Text>
      )}
      {message !== "" && (
        <Text style={[styles.message, gameOver ? styles.messageGameOver : null]}>{message}</Text>
      )}
      {gameOver && (
        <GameButton onPress={startGame} style={styles.restartButton}>
          JOGAR NOVAMENTE
        </GameButton>
      )}
    </SafeAreaView>
  );
};

export default Escopa;
