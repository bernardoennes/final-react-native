import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from '../bottomtabs';
import Blackjack  from '../../screens/jogos/blackjack/blackjack'
import Scopa from '../../screens/jogos/escopa/escopa'
import Memory from '../../screens/jogos/memory/MemoryGame'
import RegisterScreen from '../../screens/register/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  BJ: undefined;
  Scopa: undefined;
  Memory: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="BJ" component={Blackjack} />
      <Stack.Screen name="Scopa" component={Scopa} />
      <Stack.Screen name="Memory" component={Memory} />
      <Stack.Screen name="Login" component={BottomTabs} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={BottomTabs} />
    </Stack.Navigator>
  );
}