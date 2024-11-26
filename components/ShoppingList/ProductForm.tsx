import { StyleSheet, View, Modal, Text, TextInput, Pressable } from "react-native";
import { Product } from "../../app/shopping-list/interface/Product";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { colors } from "../../styles/Colors";

const categories = [
    { label: "Panadería", value: "panaderia" },
    { label: "Bebidas", value: "bebidas" },
    { label: "Enlatados", value: "enlatados" },
    { label: "Carnes", value: "carnes" },
    { label: "Pescados", value: "pescados" },
    { label: "Frutas/Verduras", value: "frutas/verduras" },
    { label: "Otros", value: "others" },
];

export type ProductFormProps = {
    visible: boolean;
    initialData?: {
        id: string;
        name: string;
        category: string;
        quantity: string;
        unitPrice: string;
        inCart: boolean
    };
    onSave: (productData: Product) => void;
    onCancel: () => void;
}
export function ProductForm({ visible, initialData, onSave, onCancel }: ProductFormProps) {

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        category: initialData?.category || "others",
        quantity: initialData?.quantity.toString() || "",
        unitPrice: initialData?.unitPrice.toString() || "",
    });

    const handleSave = () => {
        if (!formData.name.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }
        if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
            alert("La cantidad debe ser un número positivo.");
            return;
        }
        if (!formData.unitPrice || isNaN(Number(formData.unitPrice)) || Number(formData.unitPrice) <= 0) {
            alert("El precio por unidad debe ser un número positivo.");
            return;
        }
        if (!formData.category.trim()) {
            alert("La categoría no puede estar vacía.");
            return;
        }

        onSave({
            id: initialData?.id || "",
            name: formData.name.trim(),
            category: formData.category,
            quantity: parseInt(formData.quantity, 10),
            unitPrice: parseFloat(formData.unitPrice),
            inCart: initialData?.inCart || false,
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Añadir Producto
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <RNPickerSelect
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    items={categories}
                    value={formData.category}
                    placeholder={{ label: "Selecciona una categoría", value: null }}
                    style={{
                        inputIOS: styles.picker,
                        inputAndroid: styles.picker,
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad"
                    value={formData.quantity}
                    keyboardType="numeric"
                    onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Precio por unidad"
                    value={formData.unitPrice}
                    keyboardType="numeric"
                    onChangeText={(text) => setFormData({ ...formData, unitPrice: text })}
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </Pressable>
                    <Pressable style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.bottomLightColor
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    buttonContainer: {
        alignItems: "center"
    },
    saveButton: {
        color: colors.primaryLightColor,
        backgroundColor: colors.bottomLightColor,
        padding: 5,
        fontSize: 12,
        width: 120,
        textAlign: "center",
        borderRadius: 3,
        marginBottom: 5
    },
    cancelButton: {
        backgroundColor: colors.textLightMode,
        padding: 5,
        fontSize: 12,
        width: 120,
        textAlign: "center",
        borderRadius: 3
    },
    saveButtonText: {
        color: colors.primaryLightColor,
        textAlign:
            "center"
    },
    cancelButtonText: {
        color: colors.primaryLightColor,
        textAlign:
            "center"
    },
    picker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        //padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
});
