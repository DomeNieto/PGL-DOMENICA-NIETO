import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native';
import { StyleSheet } from "react-native";


import { colors } from '../../styles/Colors';
import { router } from 'expo-router';
import { UserService } from '../../service/UserService';


export default function RegisterPage() {
    const [data, setData] = useState({
        fullname: "",
        email: "",
        pswd: ""
    });


    const validatePassword = (pswd: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&/])[A-Za-z\d$@$!%*?&]{8,20}$/.test(pswd);
    const validateEmail = (email: string) => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);

    const handleRegister = async () => {
        if (!validateEmail(data.email) || !validatePassword(data.pswd)) {
            window.alert('Email inválido o contraseña insegura');
            return;
        }

        try {
            const results = await UserService.registerUser({
                fullname: data.fullname,
                email: data.email,
                pswd: data.pswd
            });

            switch (results.status) {
                case 201:
                    window.alert("Usuario registrado correctamente");
                    router.navigate("/login/LoginPage");
                    break;
                case 400:
                    window.alert("Error en los datos. Datos inválidos");
                    break;
                case 409:
                    window.alert("El correo ya está registrado.");
                    break;
                default:
                    window.alert("No es posible registrar un nuevo usuario. Intenta de nuevo");
                    break;
            }

        } catch (error) {
            console.error("Error al registrar:", error);
            window.alert("Error inesperado al registrar el usuario. Por favor, intenta de nuevo.");
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.registerContainer}>
                <Text style={styles.title}>REGISTRO</Text>
                <Text>Nombre</Text>
                <TextInput style={styles.input} placeholder="Nombre Completo" onChangeText={(text) => setData({
                    ...data,
                    fullname: text,
                })} value={data.fullname} />
                <Text>Email</Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setData({
                    ...data,
                    email: text,
                })} value={data.email} keyboardType="email-address" />
                <Text>Contraseña</Text>
                <TextInput style={styles.input} placeholder="Contraseña" onChangeText={(text) => setData({
                    ...data,
                    pswd: text,
                })} value={data.pswd} secureTextEntry />

                <Pressable style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText} >Enviar</Text >
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

    },
    registerContainer: {
        borderColor: colors.bottomLightColor,
        width: 320,
        height: 400,
        borderRadius: 20,
        padding: 30,
        borderWidth: 2
    },
    registerButtonText: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.primaryLightColor
    },
    input: {
        borderWidth: 1,
        borderColor: colors.bottomLightColor,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 8
    },
    registerButton: {
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: colors.bottomLightColor,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 150,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        color: colors.cardsDarkMode,
        fontWeight: 500
    }


})
