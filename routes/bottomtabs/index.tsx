import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, SignIn, UserCircle } from "phosphor-react-native"; // Importe os ícones desejados
import LoginScreen from "../../screens/login/Login";
import Perfil from "../../screens/perfil/perfil";
import { useUser } from "../../context/usercontext";
import RegisterScreen from "../../screens/register/RegisterScreen";
import { Home } from "../../screens/home/home";

export type TabParamList = {
  Home: undefined;
  Login: undefined;
  Profile: { userId?: string };
  Register: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  const { usuario } = useUser();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000000" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={usuario ? Perfil : LoginScreen}
        options={{
          tabBarLabel: usuario ? "Perfil" : "Login",
          tabBarIcon: ({ color, size }) =>
            usuario ? (
              <UserCircle color={color} size={size ?? 24} />
            ) : (
              <SignIn color={color} size={size ?? 24} />
            ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};
