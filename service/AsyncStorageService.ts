import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeData = async (value: string | null) => {
    try {
        if (value !== null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('my-token', jsonValue);
        }
    } catch (e) {
        console.error("AsyncStorage: Error guardando el token:", e);
    }
};


export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('my-token');
    } catch (e) {
        console.error("AsyncStorage: Error al obtener el token:", e);
        return null;
    }
};