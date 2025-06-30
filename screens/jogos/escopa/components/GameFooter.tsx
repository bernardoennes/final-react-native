import React, { useEffect } from "react";
import { Text } from "react-native";
import GameButton from "../../../../components/GameButton/gameButton";
import ScoreDisplay from "./ScoreDisplay";
import SelectedInfo from "./SelectedInfo";
import styles from "../escopa-styles";
import { Card } from "../../../../hooks/useDrawCard";

const GameFooter = ({
  message, gameOver, onRestart,
  playerHand, dealerHand,
  playerCaptured, dealerCaptured,
  setMessage, setIsPlayerTurn, setGameOver,
  selectedCard, selectedTableCards,
  isPlayerTurn,
  playCard,
}: {
  message: string, gameOver: boolean, onRestart: () => void,
  playerHand: Card[], dealerHand: Card[],
  playerCaptured: Card[], dealerCaptured: Card[],
  setMessage: (msg: string) => void, setIsPlayerTurn: (isPlayerTurn: boolean) => void, setGameOver: (gameOver: boolean) => void,
  selectedCard: Card | null, selectedTableCards: Card[],
  isPlayerTurn: boolean,
  playCard: () => void,
}) => {
  useEffect(() => {
    if (
      playerHand.length === 0 &&
      dealerHand.length === 0 &&
      !gameOver
    ) {
      let winnerMsg = "";
      if (playerCaptured.length > dealerCaptured.length) {
        winnerMsg = "Você venceu!";
      } else if (dealerCaptured.length > playerCaptured.length) {
        winnerMsg = "Dealer venceu!";
      } else {
        winnerMsg = "Empate!";
      }
      setMessage(winnerMsg);
      setIsPlayerTurn(false);
      setTimeout(() => setGameOver(true), 500);
    }
  }, [
    playerHand,
    dealerHand,
    playerCaptured,
    dealerCaptured,
    gameOver,
    setMessage,
    setIsPlayerTurn,
    setGameOver,
  ]);

  if (selectedCard && isPlayerTurn && !gameOver) {
    return (
      <>
        <SelectedInfo card={selectedCard} tableCards={selectedTableCards} />
        <GameButton onPress={playCard}>
          JOGAR CARTA
        </GameButton>
      </>
    );
  }

  // Placar ou mensagem de fim de jogo
  return (
    <>
      <ScoreDisplay
        playerCaptured={playerCaptured.length}
        dealerCaptured={dealerCaptured.length}
      />
      {message !== "" && (
        <Text style={[styles.message, gameOver ? styles.messageGameOver : null]}>{message}</Text>
      )}
      {gameOver && (
        <GameButton onPress={onRestart}>
          JOGAR NOVAMENTE
        </GameButton>
      )}
    </>
  );
};

export default GameFooter;
