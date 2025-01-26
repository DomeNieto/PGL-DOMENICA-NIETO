import { UserLoginType, UserRegisterType } from "../types/UserType";
import { RequestService } from "./RequestService";


const API_URL = "http://192.168.0.14:5000/auth"


const registerUser = async (data: UserRegisterType) => {
    try {
        const response = await fetch(
            `${API_URL}/register`,
            RequestService.initRegisterRequest(data)
        );
        const result = await response.json();

        console.log("Status Code:", response.status);
        console.log("Response Data:", result);

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

const loginUser = async (data: UserLoginType) => {
    try {
        const response = await fetch(`${API_URL}/login`, RequestService.initLoginRequest(data));

        const result = await response.json();
        console.log("Response Data:", result);

        return {
            status: response.status,
            datos: result,
        };
    } catch (error: any) {
        return {
            status: 500,
            error: error.message,
        };
    }
};

export const UserService = {
    registerUser,
    loginUser
}