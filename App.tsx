import { View } from "react-native";
import Blackjack from "./screens/jogos/blackjack/blackjack";
import Escopa from "./screens/jogos/escopa/escopa";
import Home from "./screens/home/home";
import MemoryGame from "./screens/jogos/memory/MemoryGame";
import { Routes } from "./routes";
import Perfil from "./screens/perfil/perfil";
import React from "react";
import { UserProvider } from "./context/usercontext";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
