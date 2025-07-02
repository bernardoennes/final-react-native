import React, { useState } from "react";
import { View, Text, Alert, Image, ImageBackground } from "react-native";
import styles from "./register-style";
import RegisterForm from "../../components/RegisterForm/index";
import GameButton from "../../components/GameButton/gameButton";
import axios from "axios";


function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState({nome: "", email: "", senha: "", confirmarSenha: "",});

  const handleCadastro = async () => {
    const { nome, email, senha, confirmarSenha } = formData;

    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const res = await axios.get("https://685ddf0e7b57aebd2af75044.mockapi.io/user");
      const usuarios = res.data;
      const emailJaExiste = usuarios.some((user: any) => user.email === email);

      if (emailJaExiste) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      await axios.post("https://685ddf0e7b57aebd2af75044.mockapi.io/user", {
        nome,
        email,
        senha,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Falha ao cadastrar. Tente novamente.");
    }
  };

  return (
    <ImageBackground
    source={require("../../assets/baizered-background.png")}
    style={styles.backgroundImage}
  >
      <View style={styles.container}>
        <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        
        <RegisterForm onChange={setFormData} />

        <GameButton onPress={handleCadastro}>Cadastrar</GameButton>
      </View>
    </View>
    </ImageBackground>
  );
}
