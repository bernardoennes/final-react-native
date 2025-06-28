import React, { useState } from "react";
import { View, Text, Image, ImageBackground ,} from "react-native";
import axios from "axios";
import Input from "./components/Input";
import Button from "./components/Button"; 
import styles from "./loginStyles";

export default function LoginScreen() {
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
    if (!email || !senha)
      return setErroEFalse("Preencha todos os campos.");
    if (!validarEmail(email)) 
      return setErroEFalse("E-mail inválido.");
    if (senha.length < 6)
      return setErroEFalse("A senha deve ter pelo menos 6 caracteres.");

    try {
      const { data, headers } = await axios.post(
        "https://685ddf0e7b57aebd2af75044.mockapi.io/user",
        { username: email, password: senha }
      );
      const token = headers.authorization || headers.Authorization;
      return token ? setLogado(true) : setErro("Token não recebido.");
    } catch {
      setErro("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const setErroEFalse = (msg: string) => {
    setErro(msg);
    setLoading(false);
  };

  const handleLogout = () => {
    setEmail("");
    setSenha("");
    setErro("");
    setLogado(false);
  };

  if (logado)
    return (
      <ImageBackground source={require("../../assets/baizered-background.png")} style={styles.background}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Acesso autorizado com sucesso</Text>
          <Text style={styles.email}>Usuário: {email}</Text>
          <Button onPress={handleLogout} >
            Sair
          </Button>
        </View>
      </ImageBackground>
    );

  return (
    <ImageBackground source={require("../../assets/baizered-background.png")} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Login</Text>

        <Input placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry />

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <Button onPress={handleLogin} loading={loading} >
          Entrar
        </Button>
      </View>
    </ImageBackground>
  );
}
