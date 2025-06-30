import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "../MemoryGame-styles";

const cardBackImage = require("../../../../assets/cardBack.png");

interface Props {
  id: string;
  image: string;
  faceUp: boolean;
  matched: boolean;
  onFlip: () => void;
}

export default function Card({ image, faceUp, matched, onFlip }: Props) {
  const mostrar = faceUp || matched;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onFlip}
      activeOpacity={0.8}
      disabled={mostrar}
    >
      {mostrar ? (
        <Image source={{ uri: image }} style={styles.cardImage} />
      ) : (
        <Image source={cardBackImage} style={styles.cardBackImage} />
      )}
    </TouchableOpacity>
  );
}
