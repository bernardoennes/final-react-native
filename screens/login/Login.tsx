import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import styles from "./loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(false);

  function validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleLogin() {
    setLoading(true);
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!validarEmail(email)) {
      setErro("E-mail inválido.");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: email,
        password: senha,
      });

      const token =
        response.headers["authorization"] || response.headers["Authorization"];

      if (token) {
        setLogado(true);
        setErro("");
      } else {
        setErro("Token não recebido.");
      }
    } catch (err) {
      setErro("Usuário ou senha inválidos.");
    }

    setLoading(false);
  }

  function handleLogout() {
    setEmail("");
    setSenha("");
    setErro("");
    setLogado(false);
  }

  if (logado) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Acesso autorizado com sucesso</Text>
        <Text style={styles.email}>Usuário: {email}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // alignItems -> Alinha horizontalmente
  // justifyContent -> Alinha verticalmente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
