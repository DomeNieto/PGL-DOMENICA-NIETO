import { UserRegisterType } from "../types/UserType";
import { RequestService } from "./RequestService";


const API_URL = "http://192.168.0.14:5000/auth"


export const registerUser = async (data: UserRegisterType) => {
    try {
        const response = await fetch(
            `${API_URL}/register`,
            RequestService.initRegisterRequest(data)
        );
        const result = await response.json();

        return {
            status: response.status,
            datos: result,
        };

    } catch (error: any) {
        console.error("Error al registrar:", error);
        return {
            status: 500,
            error: error.message,
        };
    }
};


export const UserService = {
    registerUser
}