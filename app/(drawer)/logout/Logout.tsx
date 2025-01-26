import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { removeToken } from '../../../service/AsyncStorageService';
import { colors } from '../../../styles/Colors';

export default function Logout() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await removeToken();
            router.navigate("/login/LoginPage");
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.logoutButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.logoutButtonText} >Cerrar sesión</Text >
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>¿Estás seguro de cerrar la cuenta?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    handleLogout();
                                }}
                            >
                                <Text style={styles.buttonText}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.primaryLightColor,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: colors.cardsLightMode,
    },
    cancelButton: {
        backgroundColor: colors.cardsDarkMode,
    },
    buttonText: {
        color: colors.primaryLightColor,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: colors.bottomLightColor,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 150,
    },
    logoutButtonText: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.primaryLightColor
    },
});