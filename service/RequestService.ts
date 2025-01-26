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



export const RequestService = {
    initRegisterRequest,
    initLoginRequest
}