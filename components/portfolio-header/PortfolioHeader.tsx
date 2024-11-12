import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { RenderManagerContext } from "../../context/RenderManagerContext";
import { colors } from "../../styles/Colors";


const PortfolioHeader = () => {
    const { darkMode } = useContext(RenderManagerContext);

    return (
        <View style={styles.bodyStails}>
            <View style={styles.bodyTopContainer}>
                <Image
                    style={[
                        styles.avatar,
                        {
                            borderColor: darkMode ? colors.bottomDarkColor : colors.bottomLightColor,
                        },
                    ]}
                    source={require("../../assets/DomenicaNieto.jpeg")}
                />
                <View
                    style={[
                        styles.backgroundOverlay,
                        {
                            backgroundColor: darkMode ? colors.cardsDarkMode : colors.cardsLightMode,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.bodyTopTitle,
                            { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                        ]}
                    >
                        Doménica Alejandra Nieto León
                    </Text>
                    <Text
                        style={[
                            styles.bodyDescription,
                            { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                        ]}
                    >
                        Soy técnico en Desarrollo de Aplicaciones Multiplataforma. Me
                        encanta aprender nuevas tecnologías y crear aplicaciones innovadoras
                        colaborando en equipo.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    bodyStails: {
        alignItems: "center"
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 5,
        position: "absolute",
    },
    bodyTopContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    backgroundOverlay: {
        width: "100%",
        alignItems: "flex-end",
        zIndex: -1,
        paddingTop: "10%",
        paddingBottom: "10%",
        paddingRight: 15,
        paddingLeft: 2
    },
    bodyTopTitle: {
        textAlign: "justify",
        fontWeight: "700",
        fontSize: 17,
        width: "70%"
    },
    bodyDescription: {
        textAlign: "justify",
        marginTop: 5,
        fontSize: 14,
        width: "70%"
    }
});

export default PortfolioHeader;
