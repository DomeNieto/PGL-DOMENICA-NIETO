import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Product } from "../../app/shopping-list/interface/Product";
import { colors } from "../../styles/Colors";

export type ProductItemProps = {
    product: Product;
    onDelete: (id: string) => void;
}

export function ProductItem({ product, onDelete }: ProductItemProps) {
    const getCategoryImage = (category: string) => {
        const images: { [key: string]: any } = {
            panaderia: require("../../assets/bakery.png"),
            bebidas: require("../../assets/beverages.png"),
            enlatados: require("../../assets/canned.png"),
            carnes: require("../../assets/meat.png"),
            pescados: require("../../assets/fish.png"),
            "frutas/verduras": require("../../assets/fruits.png"),
        };
        return images[category.toLowerCase()] || require("../../assets/others.png");
    };

    return (
        <View style={styles.container}>
            <Image source={getCategoryImage(product.category)} style={styles.image} />
            <View style={styles.details}>
                <Text>
                    {product.name}
                </Text>
                <Text>Cantidad: {product.quantity}</Text>
                <Text>Precio: €{product.unitPrice.toFixed(2)}</Text>
            </View>
            <View>
                <Pressable onPress={() => onDelete(product.id)}>
                    <Text style={styles.deleteButton}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        marginBottom: 10,
        borderColor: colors.cardsDarkMode,
        borderWidth: 2,
        padding: 5,
        borderRadius: 7
    },
    details: {
        flex: 1,
        marginLeft: 10
    },
    image: {
        width: 50,
        height: 50
    },
    deleteButton: {
        color: colors.primaryLightColor,
        backgroundColor: colors.cardsDarkMode,
        padding: 5,
        fontSize: 12,
        width: 100,
        textAlign: "center",
        borderRadius: 3
    },

});
