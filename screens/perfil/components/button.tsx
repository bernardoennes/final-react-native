import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./button-styles";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export default function Button({ onPress, title }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.textoBotao}>{title}</Text>
    </TouchableOpacity>
  );
}
