import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, GestureResponderEvent, } from "react-native";
import styles from "./ButtonStyles";
interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ onPress, loading = false, children }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={styles.button}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}


