import { StyleSheet, View } from "react-native";
import React from "react";

import RenderManagerProvider from "../../provider/RenderManagerProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer';

const Layout = () => {

    return (

        <GestureHandlerRootView >
            <RenderManagerProvider>
                <View style={{ flex: 1 }}>
                    <Drawer
                        screenOptions={{
                            drawerStyle: { maxHeight: "100%" },
                        }}
                    >
                        <Drawer.Screen
                            name="welcome/WelcomePage"
                            options={{
                                drawerLabel: "Bienvenida",
                                title: "Bienvenida",
                            }}
                        />
                        <Drawer.Screen
                            name="portfolio"
                            options={{
                                drawerLabel: "Portafolio Personal",
                                title: "Portfolio",
                            }}
                        />
                        <Drawer.Screen
                            name="shopping-list/ShoppingList"
                            options={{
                                drawerLabel: "Lista de Compra",
                                title: "Lista de compras",
                            }}
                        />
                        <Drawer.Screen
                            name="camera/CameraViewScreen"
                            options={{
                                drawerLabel: 'Camara',
                                title: 'Camara',
                            }}

                        />
                        <Drawer.Screen
                            name="logout/Logout"
                            options={{
                                drawerLabel: 'Cerrar Sesión',
                                title: 'Cerrar sesión',
                            }}

                        />

                    </Drawer>
                </View>
            </RenderManagerProvider>
        </GestureHandlerRootView>

    );
};

export default Layout;

