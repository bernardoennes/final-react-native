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
import background from '../../assets/baizered-background.png';
import NavBar from '../../components/navbar';
import { useUser } from '../../context/usercontext'; // Caminho corrigido

export default function Perfil() {
  const { usuario, atualizarUsuario } = useUser();
  const [editando, setEditando] = useState(false);

  const handleChange = (chave: string, valor: string) => {
    atualizarUsuario({ ...usuario, [chave]: valor });
  };

  const salvarAlteracoes = () => {
    setEditando(false);
    console.log("Alterações salvas!");
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

          {/* Celular */}
          <Text style={styles.label}>Celular:</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.celular}
              onChangeText={text => handleChange("celular", text)}
              placeholder="Celular"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.valor}>{usuario.celular}</Text>
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

          {/* Idade */}
          <Text style={styles.label}>Idade:</Text>
          {editando ? (
            <TextInput
              style={styles.valor}
              value={usuario.idade}
              onChangeText={text => handleChange("idade", text)}
              placeholder="Idade"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.valor}>{usuario.idade}</Text>
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
      </ScrollView>
    </ImageBackground>
  );
}
