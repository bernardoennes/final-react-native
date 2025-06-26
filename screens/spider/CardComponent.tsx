import React from "react";
import { Image, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Card } from "./SpiderGame";

interface CardProps {
  card: Card;
  faceUp?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CardComponent: React.FC<CardProps> = ({
  card,
  faceUp = true,
  onPress,
  containerStyle,
}) => {
  const imageUri = faceUp
    ? card.image
    : "https://deckofcardsapi.com/static/img/back.png";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={containerStyle}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 60,
          height: 90,
          borderRadius: 4,
        }}
      />
    </TouchableOpacity>
  );
};
