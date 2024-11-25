import React, { useState } from 'react'
import { Product } from './interface/Product';
import { StyleSheet, View, Text, FlatList, Pressable, Modal, Image } from "react-native";
import { colors } from '../../styles/Colors';

export const ShoppingListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const totalPrice = products.reduce(
        (acc, product) => (product.inCart ? acc : acc + product.quantity * product.unitPrice),
        0
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.header}>LISTA DE COMPRA</Text>
            </View>
            <View style={styles.containerPrice}>
                <Image
                    style={
                        styles.shoppingCard

                    }
                    source={require("../../assets/CarritoCompraModClaro.png")}
                />
                <Text style={styles.totalPrice}> €{totalPrice.toFixed(2)}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3
    },
    containerTitle: {
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: colors.primaryDarkColor,
        alignItems: "center"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.primaryDarkColor
    },
    containerPrice: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 10

    },
    shoppingCard: {
        height: 35,
        width: 35
    },
    totalPrice: {
        fontSize: 20,
        marginVertical: 5
    }
});
