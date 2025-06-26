import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "./loading-styles";

const Loading = ({ text = "Carregando cartas..." }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.text}>{text}</Text>
  </View>
);


export default Loading;