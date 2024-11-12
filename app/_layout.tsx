import { StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import RenderManagerProvider from "../provider/RenderManagerProvider";
import { Header } from "react-native/Libraries/NewAppScreen";

const Layout = () => {
    return (
        <RenderManagerProvider>
            <View style={styles.header}>
                <Header />
            </View>
            <View style={styles.body}>
                <Slot />
            </View>
        </RenderManagerProvider>
    );
};

export default Layout;

const styles = StyleSheet.create({
    header: {
        flex: 1.5,
    },
    footer: {
        flex: 1,
    },
    body: {
        flex: 15,
    }
});