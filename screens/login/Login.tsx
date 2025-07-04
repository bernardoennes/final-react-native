import React, { useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import axios from "axios";
import Input from "./components/Input";
import GameButton from "../../components/GameButton/gameButton";
import styles from "./loginStyles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../routes/nativestack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/usercontext";

type SkillScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({navigation}: SkillScreenProps) {
  const { atualizarUsuario } = useUser();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setLoading(true);
    setErro("");
    if (!email || !senha) return setErroEFalse("Preencha todos os campos.");
    if (!validarEmail(email)) return setErroEFalse("E-mail ou senha inválido.");
    if (senha.length < 6)
      return setErroEFalse("A senha deve ter pelo menos 6 caracteres.");

    let usuario = null;
    try {
      const buscar = await axios.get(
        "https://685ddf0e7b57aebd2af75044.mockapi.io/user?email=" + email
      );
      usuario = buscar.data[0];
    } catch {
      setErroEFalse("Email não encontrado.");
    } finally {
      if (usuario.senha === senha) {
        setLogado(true);
        await AsyncStorage.setItem('user', JSON.stringify(usuario));
        atualizarUsuario(usuario);
        setLoading(false);
      }
      else setErroEFalse("Senha incorreta.");
    }
  };

  const setErroEFalse = (msg: string) => {
    setErro(msg);
    setLoading(false);
  };

 

  return (
    <ImageBackground
      source={require("../../assets/baizered-background.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Login</Text>

        <Input
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <GameButton onPress={handleLogin} style={styles.gameButton}>
          Entrar
        </GameButton>
        <GameButton onPress={() => navigation.navigate("Register")} style={styles.gameButton}>
          Cadastre-se
        </GameButton>
      </View>
    </ImageBackground>
  );
}
