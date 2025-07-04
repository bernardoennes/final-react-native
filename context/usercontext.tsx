import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  avatar: string;
}

interface UserContextType {
  usuario: Usuario | null;
  atualizarUsuario: (novoUsuario: Usuario | null) => void;
  carregando: boolean;
}

const UserContext = createContext<UserContextType>({
  usuario: null,
  atualizarUsuario: () => {},
  carregando: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const salvo = await AsyncStorage.getItem("user");
        if (salvo) setUsuario(JSON.parse(salvo));
      } catch (e) {
        console.log("Erro ao carregar usuário:", e);
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuario();
  }, []);

  const atualizarUsuario = async (novoUsuario: Usuario | null) => {
    try {
      if (novoUsuario) {
        await AsyncStorage.setItem("user", JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);
      } else {
        await AsyncStorage.removeItem("user");
        setUsuario(null);
      }
    } catch (e) {
      console.log("Erro ao salvar usuário:", e);
    }
  };

  return (
    <UserContext.Provider value={{ usuario, atualizarUsuario, carregando }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
