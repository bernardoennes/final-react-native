import React from "react";
import styles from "./navbar-styles"
import { Image, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png"
import { useNavigation } from "@react-navigation/native";

export function NavBar() {
    const navigation = useNavigation();

    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={logo} style = {styles.logo}/>
            </TouchableOpacity>
        </View>
    );
}

export default NavBar;