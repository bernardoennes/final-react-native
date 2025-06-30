import React from "react";
import styles from "./home-styles"
import NavBar from "../../components/navbar";
import { ImageBackground, ScrollView, TouchableOpacity, Image, View } from "react-native";
import background from '../../assets/baizered-background.png'
import bjlogo from '../../assets/bjlogo.png'
import scopalogo from '../../assets/scopalogo.png'
import memorylogo from '../../assets/memorylogo.png'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../routes/nativestack";

type SkillScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export function Home({navigation}: SkillScreenProps) {

    return (
        <ImageBackground source={background} style = {styles.bg}>
        <NavBar></NavBar>
            <ScrollView style = {styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => navigation.navigate("BJ")} style = {styles.button}>
                    <Image source={bjlogo} style = {styles.gamelogo}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Scopa")} style = {styles.button}>
                    <Image source={scopalogo} style = {styles.gamelogo}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Memory")} style = {styles.button}>
                    <Image source={memorylogo} style = {styles.gamelogo}></Image>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

export default Home;