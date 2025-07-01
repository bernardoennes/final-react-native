import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, Alert } from "react-native";
import { perfilStyles as styles } from "./perfil-styles";
import NavBar from "../../components/navbar";
import { useUser } from "../../context/usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const background = require("../../assets/baizered-background.png");
const defaultAvatar = require("../../assets/default-avatar.jpg");


export default function Perfil() {
  const { usuario, atualizarUsuario } = useUser();

  const escolherImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão negada", "Permita acesso à galeria para continuar.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      if (!usuario) return;
      const novoUsuario = { ...usuario, avatar: uri };
      try {
        await AsyncStorage.setItem("user", JSON.stringify(novoUsuario));
        atualizarUsuario(novoUsuario);
        Alert.alert("Sucesso", "Imagem alterada com sucesso!");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar a imagem.");
      }
    }
  };

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
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={escolherImagem}>
            <Image
              source={
                usuario.avatar
                  ? { uri: usuario.avatar }
                  : defaultAvatar
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>{usuario.nome}</Text>
        <View style={styles.card}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.valor}>{usuario.email}</Text>
          <Text style={styles.label}>Senha:</Text>
          <Text style={styles.valor}>{usuario.senha}</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.botao, { backgroundColor: "#c00", marginTop: 10 }]}
        >
          <Text style={styles.textoBotao}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
