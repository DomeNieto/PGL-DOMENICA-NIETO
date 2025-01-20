import { StyleSheet, View, Text, Image } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useContext } from "react";
import { RenderManagerContext } from "../../../context/RenderManagerContext";

import { colors } from "../../../styles/Colors";


export default function WelcomePage() {

    const { darkMode } = useContext(RenderManagerContext);

    return (
        <View style={[
            styles.container,
            { backgroundColor: darkMode ? colors.primaryDarkColor : colors.primaryLightColor },
        ]}>
            <ExpoStatusBar style="auto" />

            <Text style={[
                styles.text,
                { color: darkMode ? colors.primaryLightColor : colors.primaryDarkColor },
            ]} >Bienvenido</Text>

            <Image
                style={styles.logo}
                resizeMode="contain"
                source={darkMode ? require("../../../assets/ModoOscuro.png") : require("../../../assets/ModoClaro.png")}
            />

            <Text style={[
                styles.description,
                { color: darkMode ? colors.primaryLightColor : colors.primaryDarkColor },
            ]} >Tu confianza , tu camino al éxito</Text>

            <Text style={[
                styles.title,
                { color: darkMode ? colors.primaryLightColor : colors.primaryDarkColor },
            ]} >PORTFOLIO APP</Text>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    text: {
        fontSize: 50,
        marginBottom: 20,
        marginTop: 150
    },
    logo: {
        width: "100%",
        height: 130,
        position: "relative"
    },
    title: {
        fontSize: 22,
        fontWeight: 700
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        justifyContent: "center",
        width: "60%",
        marginTop: "40%",
        marginBottom: 10,
    },
    pressable: {
        marginTop: 25,
        width: "40%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 20,
        shadowOpacity: 1,
        shadowRadius: 9.51,
        padding: 5,

    },
});


