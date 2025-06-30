import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./nativestack";
import { BottomTabs } from "./bottomtabs";

export function Routes() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}