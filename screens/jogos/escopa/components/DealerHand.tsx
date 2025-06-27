import React from "react";
import { View, Image } from "react-native";
import styles from "../escopa-styles";

const DealerHand = ({ count }: { count: number }) => (
  <View style={styles.dealerHandRow}>
    {Array.from({ length: count }).map((_, idx) => (
      <Image key={idx} source={{ uri: "https://deckofcardsapi.com/static/img/back.png" }} style={styles.dealerCard} />
    ))}
  </View>
);

export default DealerHand;
