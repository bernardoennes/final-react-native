import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#4b0c00',
        width: 300,
        minHeight: 300,
        borderColor: "#000",
        borderWidth: 5,
        borderRadius: 10,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    bjlogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})

export default styles;