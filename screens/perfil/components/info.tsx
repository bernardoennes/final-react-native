import React from "react";
import { Text, View } from "react-native";
import { useUser } from "../../../context/usercontext";
import styles from "./info-styles";

export default function Info() {
  const { usuario } = useUser();

  if (!usuario) return null;

  return (
    <>
      <Text style={styles.titulo}>{usuario.nome}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{usuario.email}</Text>
        <Text style={styles.label}>Senha:</Text>
        <Text style={styles.valor}>{usuario.senha}</Text>
      </View>
    </>
  );
}
