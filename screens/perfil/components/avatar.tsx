import React from "react";
import { View, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../context/usercontext";
import styles from "./avatar-styles";

const defaultAvatar = require("../../../assets/default-avatar.jpg");

export default function Avatar() {
  const { usuario, atualizarUsuario } = useUser();

  const escolherImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Permita acesso à galeria para continuar.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && usuario) {
      const uri = pickerResult.assets[0].uri;
      const novoUsuario = { ...usuario, avatar: uri };
      try {
        await AsyncStorage.setItem("user", JSON.stringify(novoUsuario));
        atualizarUsuario(novoUsuario);
        Alert.alert("Sucesso", "Imagem alterada com sucesso!");
      } catch {
        Alert.alert("Erro", "Não foi possível salvar a imagem.");
      }
    }
  };

  if (!usuario) return null;

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={escolherImagem}>
        <Image
          source={usuario.avatar ? { uri: usuario.avatar } : defaultAvatar}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}
