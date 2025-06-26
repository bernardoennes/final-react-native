// SpiderGame.tsx (modo paisagem com botões lado a lado do mesmo tamanho)

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { createSpiderDeck } from "../../utils/createSpiderDeck";
import { Column } from "./Column";
import { CardComponent } from "./CardComponent";
import styles from "../../screens/spider/game-styles";

export interface Card {
  id: string;
  code: string;
  suit: string;
  value: string;
  image: string;
  faceUp: boolean;
}

export function SpiderGame() {
  const [columns, setColumns] = useState<Card[][]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [fromColumnIndex, setFromColumnIndex] = useState<number | null>(null);
  const [foundations, setFoundations] = useState<Card[][]>([]);
  const [stock, setStock] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  useEffect(() => {
    if (!startTime) return;
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const startGame = () => {
    const deck = createSpiderDeck("easy");
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const newColumns: Card[][] = Array(10)
      .fill(null)
      .map(() => []);
    let index = 0;

    for (let i = 0; i < 10; i++) {
      const numCards = i < 4 ? 6 : 5;
      for (let j = 0; j < numCards; j++) {
        const card = shuffled[index++];
        newColumns[i].push({ ...card, faceUp: j === numCards - 1 });
      }
    }

    const remaining = shuffled
      .slice(index)
      .map((card) => ({ ...card, faceUp: false }));
    setStock(remaining);
    setColumns(newColumns);
    setFoundations([]);
    setSelectedCard(null);
    setFromColumnIndex(null);
    setMoves(0);
    setStartTime(new Date());
    setElapsedTime(0);
  };

  const getCardNumericValue = (v: string) =>
    ({ A: 1, J: 11, Q: 12, K: 13 }[v] ?? parseInt(v));

  const checkAndRemoveCompletedSequence = (
    column: Card[],
    columnIndex: number
  ): Card[] => {
    const last13 = column.slice(-13);
    const expected = [
      "K",
      "Q",
      "J",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "A",
    ];
    const valid =
      last13.length === 13 &&
      last13.every(
        (c, i) => c.value === expected[i] && c.suit === last13[0].suit
      );
    if (valid) {
      setFoundations((prev) => [...prev, last13]);
      return column.slice(0, column.length - 13);
    }
    return column;
  };

  const handleCardPress = (card: Card, colIndex: number) => {
    const column = columns[colIndex];
    const i = column.findIndex((c) => c.id === card.id);
    const subseq = column.slice(i);
    const isValid = subseq.every(
      (c, j, arr) =>
        j === 0 ||
        (c.faceUp &&
          getCardNumericValue(c.value) ===
            getCardNumericValue(arr[j - 1].value) - 1 &&
          c.suit === arr[j - 1].suit)
    );
    if (isValid) {
      setSelectedCard(card);
      setFromColumnIndex(colIndex);
    }
  };

  const handleColumnPress = (toIndex: number) => {
    if (
      !selectedCard ||
      fromColumnIndex === null ||
      toIndex === fromColumnIndex
    )
      return;
    const updated = [...columns];
    const from = [...updated[fromColumnIndex]];
    const i = from.findIndex((c) => c.id === selectedCard.id);
    const moving = from.slice(i);
    from.splice(i);

    const to = [...updated[toIndex]];
    const top = to[to.length - 1];
    const mv = getCardNumericValue(moving[0].value);
    const canMove =
      !top ||
      (mv === getCardNumericValue(top.value) - 1 &&
        moving[0].suit === top.suit);

    if (canMove) {
      updated[fromColumnIndex] = from;
      updated[toIndex] = [...to, ...moving];
      if (from.length > 0) from[from.length - 1].faceUp = true;
      updated[toIndex] = checkAndRemoveCompletedSequence(
        updated[toIndex],
        toIndex
      );
      setColumns(updated);
      setMoves((m) => m + 1);
    }
    setSelectedCard(null);
    setFromColumnIndex(null);
  };

  const dealFromStock = () => {
    if (stock.length < 10) return;
    const nextStock = [...stock];
    const updated = [...columns];
    for (let i = 0; i < 10; i++) {
      const card = nextStock.shift();
      if (card) updated[i] = [...updated[i], { ...card, faceUp: true }];
    }
    setStock(nextStock);
    setColumns(updated);
    setMoves((m) => m + 1);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Score: {foundations.length * 100}</Text>
        <Text style={styles.text}>Time: {formatTime(elapsedTime)}</Text>
        <Text style={styles.text}>Moves: {moves}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.buttonSmallDisabled,
            stock.length < 10 ? null : styles.buttonSmall,
          ]}
          onPress={dealFromStock}
          disabled={stock.length < 10}
        >
          <Text style={styles.text}>
            Stock ({Math.floor(stock.length / 10)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSmall} onPress={startGame}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.columnsContainer}>
          {columns.map((column, i) => (
            <Column
              key={i}
              cards={column}
              columnIndex={i}
              onCardPress={handleCardPress}
              onColumnPress={handleColumnPress}
              selectedCardId={selectedCard?.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
