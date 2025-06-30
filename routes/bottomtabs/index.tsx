import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../screens/home/home";
import LoginScreen from "../../screens/login/Login";

export type TabParamList = {
  Home: undefined;
  Login: undefined;
  Profile: { userId?: string };
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={LoginScreen} />
    </Tab.Navigator>
  );
};
