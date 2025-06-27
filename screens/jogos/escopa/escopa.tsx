import React from "react";
import { SafeAreaView, Text } from "react-native";
import styles from "./escopa-styles";
import Loading from "../../../components/Loading/loading";
import DealerHand from "./components/DealerHand";
import PlayerHand from "./components/PlayerHand";
import Table from "./components/Table";
import SelectedInfo from "./components/SelectedInfo";
import GameFooter from "./components/GameFooter";
import GameButton from "../../../components/GameButton/gameButton";
import { Card } from "../../../hooks/useDrawCard";
import { useEscopaGame } from "./utils/useEscopaGame";
import { usePlayCard } from "./utils/usePlayCard";

const Escopa = () => {
  const {
    loading, playerHand, dealerHand, tableCards, message, selectedCard,
    selectedTableCards, playerCaptured, dealerCaptured, playerEscopas,
    dealerEscopas, isPlayerTurn, startGame, setSelectedCard,
    setSelectedTableCards, setMessage, gameOver
  } = useEscopaGame();
  
  const playCard = usePlayCard({
    selectedCard,
    isPlayerTurn,
    selectedTableCards,
    setMessage,
    tableCards,
  });

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ESCOPA</Text>
      <Text style={styles.info}>
        Dealer: {dealerCaptured.length} : {dealerEscopas}
      </Text>
      <DealerHand count={dealerHand.length} />
      <Table
        cards={tableCards}
        selected={selectedTableCards}
        onPress={(card: Card) => {
          const isSelected = selectedTableCards.some(
            (c) => c.code === card.code
          );
          if (isSelected) {
            setSelectedTableCards((prev) =>
              prev.filter((c) => c.code !== card.code)
            );
          } else {
            setSelectedTableCards((prev) => [...prev, card]);
          }
        }}
      />

      <PlayerHand
        cards={playerHand}
        selected={selectedCard}
        onPress={setSelectedCard}
      />
      <Text style={styles.info}>
        Você: {playerCaptured.length} : {playerEscopas}
      </Text>
      <SelectedInfo card={selectedCard} tableCards={selectedTableCards} />
      {selectedCard && isPlayerTurn && !gameOver && (
        <GameButton onPress={playCard} style={styles.playButton}>
          JOGAR CARTA
        </GameButton>
      )}
      {!isPlayerTurn && !gameOver && (
        <Text style={styles.dealerTurnText}>Turno do dealer...</Text>
      )}
      <GameFooter message={message} gameOver={gameOver} onRestart={startGame} />
    </SafeAreaView>
  );
};

export default Escopa;
