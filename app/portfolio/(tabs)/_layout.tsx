import React, { useContext } from "react";

import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

import { RenderManagerContext } from "../../../context/RenderManagerContext";
import PortfolioHeader from "../../../components/portfolio-header/PortfolioHeader";
import { colors } from "../../../styles/Colors";


const TabsLayout = () => {
    const { darkMode } = useContext(RenderManagerContext);
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.tabBarActiveColor,
                header: () => <PortfolioHeader />,
                tabBarStyle: {
                    backgroundColor: darkMode ? colors.cardsDarkMode : colors.primaryLightColor
                },

            }}
        >
            <Tabs.Screen
                name="personalInfo"
                options={{
                    title: "CV",
                    tabBarIcon: () => <Entypo name="list" size={23} style={[
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]} />,


                }}
            />
            <Tabs.Screen
                name="repository"
                options={{
                    title: "Repositorio",
                    tabBarIcon: () => <Entypo name="github" size={23} style={[
                        { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
                    ]} />,
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
