import React from "react";
import styles from "./home-styles"
import NavBar from "../../components/navbar";
import { ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";
import background from '../../assets/baize-background.png'
import bjlogo from '../../assets/bjlogo.png'

export function Home() {
    return (
        <ImageBackground source={background} style = {styles.bg}>
        <NavBar></NavBar>
            <ScrollView style = {styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style = {styles.button}>
                    <Image source={bjlogo} style = {styles.bjlogo}></Image>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

export default Home;