import React, { useContext } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";

import Project from "../../components/PersonalInfo/Project";
import { Projects } from "../../components/PersonalInfo/Data/Projects";
import Skill from "../../components/PersonalInfo/Skill";
import { Skills } from "../../components/PersonalInfo/Data/Skills";
import Technology from "../../components/PersonalInfo/Technology";
import { Technologies } from "../../components/PersonalInfo/Data/Technologies";
import { RenderManagerContext } from "../../context/RenderManagerContext";
import { colors } from "../../styles/Colors";


const InfoListPage = () => {
    const { darkMode } = useContext(RenderManagerContext);

    return (
        <View
            style={[
                styles.bodyBottomContainer,
                { backgroundColor: darkMode ? colors.primaryDarkColor : colors.primaryLightColor },
            ]}
        >
            <View style={styles.bodyBottomContainerLeft}>
                <Text
                    style={[
                        styles.bodyBottomTitle,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    Tecnologías
                </Text>
                <ScrollView style={{ padding: 2, maxHeight: "35%" }}>
                    {Technologies.map((tech, index) => (
                        <Technology
                            body={tech.body}
                            title={tech.title}
                            key={index}
                            darkMode={darkMode}
                        />
                    ))}
                </ScrollView>
                <Text
                    style={[
                        styles.bodyBottomTitle,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    Habilidades Blandas
                </Text>
                <ScrollView style={{ padding: 2, maxHeight: "40%" }}>
                    {Skills.map((skill, index) => (
                        <Skill body={skill.body} key={index} darkMode={darkMode}></Skill>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.bodyBottomContainerRight}>
                <Text
                    style={[
                        styles.bodyBottomTitle,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    Proyectos
                </Text>

                <ScrollView style={{ padding: 2, maxHeight: "35%" }}>
                    {Projects.map((pro, index) => (
                        <Project
                            body={pro.body}
                            key={index}
                            darkMode={darkMode}
                        ></Project>
                    ))}
                </ScrollView>
                <Text
                    style={[
                        styles.bodyBottomTitle,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    Idiomas
                </Text>
                <Text
                    style={[
                        styles.bodyBottomDescription,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    - Ingles
                </Text>
                <Text
                    style={[
                        styles.bodyBottomDescription,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    - Español
                </Text>
                <Text
                    style={[
                        styles.bodyBottomTitle,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    Contacto
                </Text>
                <Text
                    style={[
                        styles.bodyBottomDescription,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    - domealenietol@gmail.com
                </Text>
                <Text
                    style={[
                        styles.bodyBottomDescription,
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]}
                >
                    - 611789880
                </Text>
            </View>
        </View>

    );
};

export default InfoListPage;

const styles = StyleSheet.create({
    bodyBottomContainer: {
        flexDirection: "row",
        height: "100%",
    },
    bodyBottomTitle: {
        fontWeight: "900",
        textTransform: "capitalize",
        fontSize: 18,
        textAlign: "center",
        paddingTop: 20,
    },
    bodyBottomContainerLeft: {
        paddingLeft: 10,
        flex: 1
    },
    bodyBottomContainerRight: {
        flex: 1,
        paddingRight: 10,
    },
    bodyBottomDescription: {
        fontSize: 14,
        paddingLeft: 15,
    },
});
