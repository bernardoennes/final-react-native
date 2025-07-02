import React from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { perfilStyles as styles } from "./perfil-styles";
import NavBar from "../../components/navbar";
import { useUser } from "../../context/usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Avatar from "./components/avatar";
import Info from "./components/info";
import Button from "./components/button";



const background = require("../../assets/baizered-background.png");

export default function Perfil() {
  const { usuario, atualizarUsuario } = useUser();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    atualizarUsuario(null);
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={background} style={styles.bg}>
      <NavBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar />
        <Info />
        <Button onPress={handleLogout} title="Logout" />
      </ScrollView>
    </ImageBackground>
  );
}
