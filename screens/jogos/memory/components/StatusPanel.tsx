import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../MemoryGame-styles";
import GameButton from "../../../../components/GameButton/gameButton";

interface Props {
  moves: number;
  won: boolean;
  onRestart: () => void;
}

export default function StatusPanel({ moves, won, onRestart }: Props) {
  return won ? (
    <View style={styles.wonBox}>
      <Text style={styles.wonText}>Você venceu em {moves} jogadas!</Text>
      <GameButton onPress={onRestart}>
        <Text>Jogar novamente</Text>
      </GameButton>
    </View>
  ) : (
    <Text style={styles.movesText}>Jogadas: {moves}</Text>
  );
}
