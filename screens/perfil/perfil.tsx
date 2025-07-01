import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { perfilStyles as styles } from './perfil-styles';
import NavBar from '../../components/navbar';
import { useUser } from '../../context/usercontext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const background = require('../../assets/baizered-background.png');

export default function Perfil() {
  const { usuario, atualizarUsuario } = useUser();
  const [editando, setEditando] = useState(false);

  const handleChange = (chave: keyof Usuario, valor: string) => {
  if (!usuario) return;
  atualizarUsuario({
    ...usuario,
    [chave]: valor || "",
  } as Usuario);
};

  const salvarAlteracoes = () => {
    setEditando(false);
    console.log("Alterações salvas!");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    atualizarUsuario(null); // Limpa o usuário no contexto, se aplicável
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
        <Image
          source={{
            uri: usuario.avatar
              ? `https://deckofcardsapi.com/static/img/${usuario.avatar}.png`
              : 'https://deckofcardsapi.com/static/img/back.png'
          }}
          style={styles.avatar}
        />

        <Text style={styles.titulo}>{usuario.nome}</Text>

        <View style={styles.card}>
          {/* Avatar */}
          <Text style={styles.label}>Carta Avatar (ex: KH):</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.avatar}
              onChangeText={text => handleChange("avatar", text.toUpperCase())}
              placeholder="Ex: KH"
              placeholderTextColor="#666"
              maxLength={2}
            />
          ) : (
            <Text style={styles.valor}>{usuario.avatar || "Nenhuma"}</Text>
          )}

          {/* Nome */}
          <Text style={styles.label}>Nome:</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.nome}
              onChangeText={text => handleChange("nome", text)}
              placeholder="Nome"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.valor}>{usuario.nome}</Text>
          )}

          {/* Email */}
          <Text style={styles.label}>E-mail:</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.email}
              onChangeText={text => handleChange("email", text)}
              placeholder="E-mail"
              placeholderTextColor="#666"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.valor}>{usuario.email}</Text>
          )}

          {/* Senha */}
          <Text style={styles.label}>Senha:</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.senha}
              onChangeText={text => handleChange("senha", text)}
              placeholder="Senha"
              placeholderTextColor="#666"
              secureTextEntry
            />
          ) : (
            <Text style={styles.valor}>{usuario.senha}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={editando ? salvarAlteracoes : () => setEditando(true)}
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>
            {editando ? "Salvar Alterações" : "Editar Perfil"}
          </Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.botao, { backgroundColor: '#c00', marginTop: 10 }]}
        >
          <Text style={styles.textoBotao}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
