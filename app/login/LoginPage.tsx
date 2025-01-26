import { router, Link } from 'expo-router';
import React, { useState } from 'react'

import { Pressable, Text, TextInput, View } from 'react-native';

import { StyleSheet } from "react-native";
import { colors } from '../../styles/Colors';
import { storeData } from '../../service/AsyncStorageService';
import { UserService } from '../../service/UserService';


export default function LoginPage() {

    const [data, setData] = useState({
        email: "",
        pswd: ""
    });

    const validateEmail = (email: string) => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);

    const handleLogin = async () => {
        if (!validateEmail(data.email)) {
            window.alert('Email inválido');
            return;
        }

        if (!data.pswd || data.pswd.trim() === "") {
            window.alert('La contraseña no puede estar vacía');
            return;
        }

        try {
            const results = await UserService.loginUser({
                email: data.email,
                pswd: data.pswd,
            });

            switch (results.status) {
                case 200:
                case 201:
                    if (results.datos?.object?.token) {
                        await storeData(results.datos.object.token);
                        window.alert("Usuario autenticado correctamente");
                        router.navigate("./../(drawer)/welcome/WelcomePage");
                    } else {
                        window.alert("No se recibió un token válido del servidor");
                    }
                    break;
                case 400:
                    window.alert("Error en los datos: Datos inválidos");
                    break;
                case 401:
                    window.alert("El correo o la contraseña son incorrectos");
                    break;
                default:
                    console.error("Error inesperado:", results.status)
                    window.alert("No es posible ingresar. Intenta de nuevo");
                    break;
            }
        } catch (error) {
            console.error("Error inesperado:", error)
            window.alert("Error inesperado al intentar ingresar. Por favor, intenta de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput style={styles.title}>Iniciar sesión</TextInput>
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

                <Pressable style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText} >Enviar</Text >
                </Pressable>
                <View style={styles.footerContainer}>
                    <Text>No tienes cuenta. </Text>
                    <Link href="/register/RegisterPage" style={styles.link}>Registrarse</Link>
                </View>

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
    loginContainer: {
        borderWidth: 2,
        borderColor: colors.bottomLightColor,
        width: 320,
        height: 350,
        borderRadius: 15,
        padding: 30,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.primaryLightColor
    },
    input: {
        borderWidth: 1,
        borderColor: colors.bottomLightColor,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 10
    },
    loginButton: {
        marginTop: 20,
        borderRadius: 50,
        backgroundColor: colors.bottomLightColor,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 150,
    },
    title: {
        textAlign: "center",
        fontSize: 20
    },
    footerContainer: {
        flexDirection: "row",
        width: 200,
        alignSelf: "center",
        marginTop: 30
    },
    link: {
        color: colors.bottomLightColor
    }

})
