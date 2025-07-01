import React, { useEffect } from "react";
import { SafeAreaView, Text, ImageBackground } from "react-native";
import styles from "./escopa-styles";
import Loading from "../../../components/Loading/loading";
import DealerHand from "./components/DealerHand";
import PlayerHand from "./components/PlayerHand";
import Table from "./components/Table";
import GameFooter from "./components/GameFooter";
import { Card } from "../../../hooks/useDrawCard";
import { useEscopaGame } from "./utils/useEscopaGame";
import { useDealerPlay } from "./utils/useDealerPlay";
import { usePlayCard } from "./utils/usePlayCard";
import { NavBar } from "../../../components/navbar";

const background = require("../../../assets/baizegreen-background.png");

const Escopa = () => {
  const {
    loading, playerHand, dealerHand, tableCards, message, selectedCard,
    selectedTableCards, playerCaptured, dealerCaptured, isPlayerTurn, startGame, setSelectedCard,
    setSelectedTableCards, setMessage, gameOver, setPlayerHand,
    setTableCards, setPlayerCaptured,
    setDealerHand, setDealerCaptured, setIsPlayerTurn, setGameOver
  } = useEscopaGame();

  useEffect(() => {
    startGame();
  }, []);

  const dealerPlay = useDealerPlay({
    dealerHand, tableCards, setDealerHand, setTableCards,
    setDealerCaptured, dealerCaptured, setIsPlayerTurn,
  });

  const playCard = usePlayCard({
    selectedCard, isPlayerTurn, selectedTableCards, tableCards,
    playerHand, setPlayerHand, setTableCards, setSelectedCard,
    setMessage, setSelectedTableCards, playerCaptured, setPlayerCaptured,
    dealerPlay,
  });

  if (loading) return <Loading />;

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <NavBar></NavBar>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ESCOPA</Text>
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
        {!isPlayerTurn && !gameOver && (
          <Text style={styles.dealerTurnText}>Turno do dealer...</Text>
        )}
        <GameFooter
          message={message} gameOver={gameOver}
          onRestart={startGame} playerHand={playerHand}
          dealerHand={dealerHand} playerCaptured={playerCaptured}
          dealerCaptured={dealerCaptured} setMessage={setMessage}
          setIsPlayerTurn={setIsPlayerTurn} setGameOver={setGameOver}
          selectedCard={selectedCard} selectedTableCards={selectedTableCards}
          isPlayerTurn={isPlayerTurn} playCard={playCard}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Escopa;
