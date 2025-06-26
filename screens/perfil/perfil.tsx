import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { perfilStyles as styles } from './perfil';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Perfil() {
  const [dados, setDados] = useState<{
    nome: string;
    email: string;
    celular: string;
    senha: string;
    idade: string;
  } | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dadosSalvos = await AsyncStorage.getItem('usuario');
        if (dadosSalvos) {
          setDados(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        console.log('Erro ao carregar:', e);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0a84ff" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil do Usuário</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.valor}>{dados.nome}</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{dados.email}</Text>

        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.valor}>{dados.celular}</Text>

        <Text style={styles.label}>Senha:</Text>
        <Text style={styles.valor}>{dados.senha}</Text>

        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.valor}>{dados.idade}</Text>
      </View>
    </ScrollView>
  );
}

