import { useState } from 'react'
import { StyleSheet, View, Text, FlatList, Pressable, Image } from "react-native";

import { colors } from '../../styles/Colors';
import { Product } from './interface/Product';
import { ProductItem } from '../../components/ShoppingList/ProductItem';
import { ProductForm } from '../../components/ShoppingList/ProductForm';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import React from 'react';

export const ShoppingListPage = () => {
  const initializeProducts = () => [
    { id: uuidv4(), name: 'Manzanas', category: 'frutas/verduras', quantity: 2, unitPrice: 1.5, inCart: false },
    { id: uuidv4(), name: 'Pan', category: 'panaderia', quantity: 1, unitPrice: 2.0, inCart: false },
    { id: uuidv4(), name: 'Leche', category: 'bebidas', quantity: 3, unitPrice: 1.2, inCart: false },
  ];

  const [products, setProducts] = useState<Product[]>(initializeProducts);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalPrice = products.reduce(
    (acc, product) => (product.inCart ? acc + product.quantity * product.unitPrice : acc),
    0
  );

  const toggleFormModal = () => setFormModalVisible(!formModalVisible);

  const handleDeleteAll = () => { setProducts([]) };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));

  };

  const handleSaveProduct = (productData: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...productData, id: editingProduct.id }
            : product
        )
      );
    } else {
      setProducts((prev) => [...prev, { ...productData, id: uuidv4(), inCart: false }]);
    }
    setEditingProduct(null);
    toggleFormModal();
  };

  const handleToggleInCart = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, inCart: !product.inCart } : product
      )
    );
  };

  return (
    <View style={styles.container}>
      {!formModalVisible && (
        <>
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

          <View style={styles.containerList}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductItem
                  product={item}
                  onEdit={(product) => {
                    setEditingProduct(product);
                    toggleFormModal();
                  }}
                  onDelete={handleDeleteProduct}
                  onToggleInCart={handleToggleInCart}
                />
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>La lista está vacía</Text>}
            />
          </View>
          <View style={styles.containerButtons}>
            <Pressable style={styles.addButton} onPress={toggleFormModal}>
              <Text style={styles.addButtonText}>Añadir Producto</Text>
            </Pressable>

            {products.length > 0 ? (
              <Pressable style={styles.clearButton} onPress={handleDeleteAll}>
                <Text style={styles.clearButtonText}>Limpiar Lista</Text>
              </Pressable>
            ) : <></>}
          </View>
        </>
      )}

      <ProductForm
        visible={formModalVisible}
        initialData={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setEditingProduct(null);
          toggleFormModal();
        }}
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
  containerList: {
    height: "65%"
  },
  containerButtons: {
    //alignItems: "center",
    marginLeft: "35%",
    position: "absolute",
    top: "80%",
  },
  addButton: {
    backgroundColor: colors.bottomLightColor,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    // width: "5%",
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
  clearButton: {
    backgroundColor: colors.textLightMode,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  clearButtonText: {
    color: colors.primaryLightColor
  }
});
