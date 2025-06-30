import React, { useState } from "react";
import {TextInput,TextInputProps,View,TouchableOpacity,} from "react-native";
import styles from "./InputStyle";
import { Eye, EyeOff } from "lucide-react-native"; 

export default function Input(props: TextInputProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = props.secureTextEntry;

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        autoCapitalize="none"
        placeholderTextColor="#ccc"
        secureTextEntry={isPassword && !visible}
        style={[styles.input, props.style]}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setVisible(!visible)}
        >
          {visible ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
        </TouchableOpacity>
      )}
    </View>
  );
}

