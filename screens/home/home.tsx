import React from "react";
import styles from "./home-styles"
import NavBar from "../../components/navbar";
import { ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../routes/nativestack";

const background = require("../../assets/baizered-background.png");
const bjlogo = require("../../assets/bjlogo.png");
const scopalogo = require("../../assets/scopalogo.png");

type SkillScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export function Home({navigation}: SkillScreenProps) {

    return (
        <ImageBackground source={background} style={styles.bg}>
            <NavBar />
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => navigation.navigate("BJ")} style={styles.button}>
                    <Image source={bjlogo} style={styles.gamelogo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Scopa")} style={styles.button}>
                    <Image source={scopalogo} style={styles.gamelogo} />
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

export default Home;