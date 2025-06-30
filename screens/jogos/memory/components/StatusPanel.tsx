import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../MemoryGame-styles";

interface Props {
  moves: number;
  won: boolean;
  onRestart: () => void;
}

export default function StatusPanel({ moves, won, onRestart }: Props) {
  return won ? (
    <View style={styles.wonBox}>
      <Text style={styles.wonText}>Você venceu em {moves} jogadas!</Text>
      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>Jogar novamente</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text style={styles.movesText}>Jogadas: {moves}</Text>
  );
}
