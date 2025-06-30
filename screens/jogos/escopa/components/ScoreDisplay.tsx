import React from "react";
import { View, Text } from "react-native";
import styles from "../escopa-styles";

interface ScoreDisplayProps {
  playerCaptured: number;
  dealerCaptured: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  playerCaptured,
  dealerCaptured,
}) => (
  <View style={styles.scoreContainer}>
    <View style={styles.scoreBlock}>
      <Text style={styles.scoreTitle}>Você</Text>
      <Text style={styles.scoreValue}>Cartas: {playerCaptured}</Text>
    </View>
    <View style={styles.scoreBlock}>
      <Text style={styles.scoreTitle}>Dealer</Text>
      <Text style={styles.scoreValue}>Cartas: {dealerCaptured}</Text>
    </View>
  </View>
);

export default ScoreDisplay;