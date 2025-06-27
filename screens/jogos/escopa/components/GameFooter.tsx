import React from "react";
import { Text } from "react-native";
import GameButton from "../../../../components/GameButton/gameButton";
import styles from "../escopa-styles";

const GameFooter = ({ message, gameOver, onRestart }: {
  message: string, gameOver: boolean, onRestart: () => void
}) => (
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

export default GameFooter;
