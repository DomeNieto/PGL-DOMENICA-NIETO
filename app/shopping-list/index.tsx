import React from "react";
import { View, StyleSheet } from "react-native";
import { ShoppingListPage } from "./ShoppingList";


export default function index() {
    return (
        <View style={styles.container}>
            <ShoppingListPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
});
