import React, { useContext } from "react";

import { View, StyleSheet, Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

import { Link } from "expo-router";
import { RenderManagerContext } from "../context/RenderManagerContext";
import { colors } from "../styles/Colors";


const Header = () => {
    const { darkMode, setDarkMode, isListRendered, setIsListRendered } = useContext(RenderManagerContext);
    return (
        <View style={[
            styles.headerContainer,
            { backgroundColor: darkMode ? colors.primaryDarkColor : colors.primaryLightColor },
        ]} >

            {isListRendered && (
                <Link href="/" onPress={() => setIsListRendered(!isListRendered)} >
                    <Entypo name="home" size={32} />
                </Link>
            )}

            <Ionicons
                onPress={() => setDarkMode(!darkMode)}
                name={
                    darkMode ? "sunny-outline" : "moon-outline"
                }
                color={darkMode ? colors.primaryLightColor : colors.textLightMode}
                size={24}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: "100%",
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    pressable: {
        width: 80,
        height: 35,
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 15,
        shadowOpacity: 1,
        shadowRadius: 9.51,
    },
});

export default Header;
