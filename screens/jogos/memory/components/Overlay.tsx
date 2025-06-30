import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../MemoryGame-styles";
import GameButton from "../../../../components/GameButton/gameButton";

interface Props {
  type: "loading" | "error";
  message?: string;
  retry?: () => void;
}

export default function Overlay({ type, message, retry }: Props) {
  if (type === "loading") {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.centerBox}>
      <Text style={styles.errorText}>{message || "Erro ao carregar"}</Text>
      {retry && (
        <GameButton onPress={retry}>
          <Text>Tentar novamente</Text>
        </GameButton>
      )}
    </View>
  );
}
