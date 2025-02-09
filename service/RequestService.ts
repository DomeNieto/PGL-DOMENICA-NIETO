import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLoginType, UserRegisterType } from "../types/UserType";

const initRegisterRequest = (data: UserRegisterType) => {
    const registerRequest: RequestInit = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            data
        ),

    };
    console.log('Body', registerRequest.body);
    return registerRequest;
};

const initLoginRequest = (data: UserLoginType) => {
    const loginRequest: RequestInit = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            data
        ),
    };
    console.log('Body:', loginRequest.body);
    return loginRequest;
};

const initPostPhotos = async (encodedData: String, width: number, height: number) => {
    const token = await AsyncStorage.getItem('my-token');
    console.log('Token recuperado:', token);

    if (token) {
        const cleanedToken = token.replace(/['"]+/g, '');
        const fetchRequest: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cleanedToken}`,
            },
            body: JSON.stringify({ height, width, encodedData })
        }
        return fetchRequest

    } else {
        console.error('Token no encontrado');
        throw new Error('No se encontró el token');
    }
}


export const RequestService = {
    initRegisterRequest,
    initLoginRequest,
    initPostPhotos
}