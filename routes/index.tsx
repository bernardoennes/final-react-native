import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./nativestack";

export function Routes() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}