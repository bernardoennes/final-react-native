import React from "react";
import { SafeAreaView, ScrollView, Text, ImageBackground } from "react-native";
import { useMemoryGame } from "./hooks/useMemoryGame";
import CardGrid from "./components/CardGrid";
import StatusPanel from "./components/StatusPanel";
import Overlay from "./components/Overlay";
import styles from "./MemoryGame-styles";
import NavBar from "../../../components/navbar";

export default function MemoryGameScreen() {
  const { cards, moves, won, loading, error, flipCard, restart } =
    useMemoryGame(8);

  if (loading) return <Overlay type="loading" />;
  if (error) return <Overlay type="error" message={error} retry={restart} />;

  const background = require("../../../assets/baizeblue-background.png");

  return (
    <ImageBackground source={background} style={styles.background}>
      <NavBar></NavBar>
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.title}>Jogo da Memória</Text>
        <StatusPanel moves={moves} won={won} onRestart={restart} />
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <CardGrid cards={cards} onFlip={flipCard} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
