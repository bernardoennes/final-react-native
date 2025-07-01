import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import styles from "./style";

interface Props {
  onChange: (values: {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }) => void;
}

const RegisterForm: React.FC<Props> = ({ onChange }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    onChange({ nome, email, senha, confirmarSenha });
  }, [nome, email, senha, confirmarSenha]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
    </View>
  );
};

export default RegisterForm;
