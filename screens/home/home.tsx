import React from "react";
import styles from "./home-styles"
import NavBar from "../../components/navbar";
import { ImageBackground, ScrollView, TouchableOpacity, Image, View } from "react-native";
import background from '../../assets/baizered-background.png'
import bjlogo from '../../assets/bjlogo.png'
import scopalogo from '../../assets/scopalogo.png'

export function Home() {
    return (
        <ImageBackground source={background} style = {styles.bg}>
        <NavBar></NavBar>
            <ScrollView style = {styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style = {styles.button}>
                    <Image source={bjlogo} style = {styles.gamelogo}></Image>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}>
                    <Image source={scopalogo} style = {styles.gamelogo}></Image>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

export default Home;