import { View } from "react-native";
import Blackjack from "./screens/blackjack/blackjack";
import RegisterScreen from "./screens/register/RegisterScreen";

function App() {
  return (
    <View style={{ flex:1}}>
      {/* <Blackjack /> */}
      <RegisterScreen />
      
    </View>
  );
}

export default App;
