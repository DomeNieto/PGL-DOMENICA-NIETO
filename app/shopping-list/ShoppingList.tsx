import { useState } from 'react'
import { Product } from './interface/Product';
import { StyleSheet, View, Text, FlatList, Pressable, Image } from "react-native";
import { colors } from '../../styles/Colors';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import React from 'react';
import { ProductItem } from '../../components/ShoppingList/ProductItem';
import { ProductForm } from '../../components/ShoppingList/ProductForm';

export const ShoppingListPage = () => {
    const initializeProducts = () => [
        { id: uuidv4(), name: 'Manzanas', category: 'frutas/verduras', quantity: 2, unitPrice: 1.5, inCart: false },
        { id: uuidv4(), name: 'Pan', category: 'panaderia', quantity: 1, unitPrice: 2.0, inCart: false },
        { id: uuidv4(), name: 'Leche', category: 'bebidas', quantity: 3, unitPrice: 1.2, inCart: false },
    ];

    const [products, setProducts] = useState<Product[]>(initializeProducts);
    const [formModalVisible, setFormModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "others",
        quantity: "",
        unitPrice: "",
        inCart: false
    });

    const totalPrice = products.reduce(
        (acc, product) => (product.inCart ? acc : acc + product.quantity * product.unitPrice),
        0
    );

    const toggleFormModal = () => setFormModalVisible(!formModalVisible);


    const handleDeleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));

    };

    const handleAddProduct = (product: Product) => {
        setProducts((prev) => [...prev, { ...product, id: uuidv4() }]);
        toggleFormModal();
    };

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

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem
                        product={item}
                        onDelete={handleDeleteProduct}

                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>La lista está vacía</Text>}
            />

            {!formModalVisible && (
                <View style={styles.containerButtons}>
                    <Pressable style={styles.addButton} onPress={toggleFormModal}>
                        <Text style={styles.addButtonText}>Añadir Producto</Text>
                    </Pressable>
                </View>
            )}
            <ProductForm
                visible={formModalVisible}
                onSave={handleAddProduct}
                onCancel={toggleFormModal}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
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
    },
    containerButtons: {
        //alignItems: "center",
        marginLeft: "35%",
        position: "absolute",
        bottom: "15%"
    },
    addButton: {
        backgroundColor: colors.bottomLightColor,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center"
    },
    addButtonText: {
        color: colors.primaryLightColor,
    },
    emptyText: {
        textAlign: "center",
        //fontStyle: "italic",
        marginTop: 20
    },
});
