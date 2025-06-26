import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./register-style";

export default function RegisterScreen() {
  return (
    <View style={styles.background}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>


      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#ccc"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => {
            console.log("Cadastro pressionado");
          }}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.homeFloatingButton}
        activeOpacity={0.7}
        onPress={() => {
          console.log("Botão de home pressionado");
        }}
      >
        <Image
          source={require("../../assets/home.png")}
          style={styles.homeIcon}
        />
      </TouchableOpacity>

    </View>
  );
}
