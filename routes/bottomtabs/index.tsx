import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, SignIn } from "phosphor-react-native"; // Importe os ícones desejados
import LoginScreen from "../../screens/login/Login";
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
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
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
