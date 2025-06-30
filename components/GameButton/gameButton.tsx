import React, { ReactNode } from "react";
import { TouchableOpacity, Text, GestureResponderEvent, ViewStyle } from "react-native";
import styles from "./gameButton-styles";

interface GameButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const GameButton: React.FC<GameButtonProps> = ({ onPress, children, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);



export default GameButton;