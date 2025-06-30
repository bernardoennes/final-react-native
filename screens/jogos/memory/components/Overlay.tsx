import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../MemoryGame-styles";

interface Props {
  type: "loading" | "error";
  message?: string;
  retry?: () => void;
}

export default function Overlay({ type, message, retry }: Props) {
  if (type === "loading") {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#FFCC00" />
      </View>
    );
  }

  return (
    <View style={styles.centerBox}>
      <Text style={styles.errorText}>{message || "Erro ao carregar"}</Text>
      {retry && (
        <TouchableOpacity style={styles.button} onPress={retry}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
