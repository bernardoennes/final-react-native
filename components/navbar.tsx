import React from "react";
import styles from "./navbar-styles"
import { Image, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png"
import { GearSix, House } from "phosphor-react-native";

export function NavBar() {
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.button}>
                <House size={32} weight="fill"/>
            </TouchableOpacity>
            <Image source={logo} style = {styles.logo}/>
            <TouchableOpacity style = {styles.button}>
                <GearSix size={32} weight="fill"/>
            </TouchableOpacity>
        </View>
    );
}

export default NavBar;