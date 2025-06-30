import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../../screens/home/home'
import Blackjack  from '../../screens/jogos/blackjack/blackjack'
import Scopa from '../../screens/jogos/escopa/escopa'
import Memory from '../../screens/jogos/memory/MemoryGame'

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  BJ: undefined;
  Scopa: undefined;
};

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BJ" component={Blackjack} />
      <Stack.Screen name="Scopa" component={Scopa} />
      <Stack.Screen name="Memory" component={Memory} />
    </Stack.Navigator>
  );
}