import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Product } from "../../app/(drawer)/shopping-list/interface/Product";
import { colors } from "../../styles/Colors";

export type ProductItemProps = {
    product: Product;
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
    onToggleInCart: (id: string) => void;

}

export function ProductItem({ product, onDelete, onEdit, onToggleInCart }: ProductItemProps) {
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
                <Text style={product.inCart ? styles.name : styles.pendingText}>
                    {product.name}
                </Text>
                <Text>Cantidad: {product.quantity}</Text>
                <Text>Precio: €{product.unitPrice.toFixed(2)}</Text>
            </View>
            <View>
                <Pressable onPress={() => onToggleInCart(product.id)}>
                    <Text style={styles.stateButton}>{product.inCart ? "Obtenido" : "Pedir"}</Text>
                </Pressable>
                <Pressable onPress={() => onEdit(product)}>
                    <Text style={styles.editButton}>Editar</Text>
                </Pressable>
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
        paddingHorizontal: 10,
        //paddingBottom: 5,
        paddingVertical: 5,
        borderRadius: 7,
        width: "95%",
        marginHorizontal: 10

    },
    details: {
        marginTop: 10,
        flex: 1,
        marginLeft: 10,
        verticalAlign: "middle" ////////////
    },
    image: {
        marginTop: 10,
        width: 60,
        height: 60
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
    stateButton: {
        textAlign: "center",
        borderRadius: 3,
        fontSize: 12,
        color: colors.primaryLightColor,
        backgroundColor: colors.tabBarActiveColor,
        padding: 5,

    },
    editButton: {
        color: colors.primaryLightColor,
        backgroundColor: colors.bottomLightColor,
        marginVertical: 2,
        fontSize: 12,
        padding: 5,
        textAlign: "center",
        borderRadius: 3
    },
    name: {
        textDecorationLine: "line-through"
    },
    pendingText: {}



});
