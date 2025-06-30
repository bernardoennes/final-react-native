import { View } from "react-native";
import Blackjack from "./screens/jogos/blackjack/blackjack";
import Escopa from "./screens/jogos/escopa/escopa";
import Home from "./screens/home/home";
import MemoryGame from "./screens/jogos/memory/MemoryGame";
import { Routes } from "./routes";

function App() {
  return (
    // <Routes/>
    <MemoryGame />
  );
}

export default App;
