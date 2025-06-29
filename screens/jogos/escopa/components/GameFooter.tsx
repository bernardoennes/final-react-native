import React, { useEffect } from "react";
import { Text } from "react-native";
import GameButton from "../../../../components/GameButton/gameButton";
import styles from "../escopa-styles";

const GameFooter = ({ message, gameOver, onRestart, playerHand, dealerHand, playerCaptured, dealerCaptured, setMessage, setIsPlayerTurn, setGameOver }: {
  message: string, gameOver: boolean, onRestart: () => void,
  playerHand: any[], dealerHand: any[],
  playerCaptured: any[], dealerCaptured: any[],
  setMessage: (msg: string) => void, setIsPlayerTurn: (isPlayerTurn: boolean) => void, setGameOver: (gameOver: boolean) => void
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

  return (
    <>
      {message !== "" && (
        <Text style={[styles.message, gameOver ? styles.messageGameOver : null]}>{message}</Text>
      )}
      {gameOver && (
        <GameButton onPress={onRestart} style={styles.restartButton}>
          JOGAR NOVAMENTE
        </GameButton>
      )}
    </>
  );
};

export default GameFooter;
