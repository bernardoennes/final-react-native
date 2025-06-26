import { StyleSheet, Text, View } from "react-native";
import Blackjack from "./screens/blackjack/blackjack";
import Login from "./screens/login/Login";

function App() {
  return (
    <View style={appStyles.appContainer}>
      <Login />
    </View>
  );
}

const appStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
