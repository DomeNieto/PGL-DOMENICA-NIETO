import { router } from "expo-router";
import { useEffect } from "react";
import { getToken } from "../service/AsyncStorageService";

export default function AppPage() {

    let isAuthenticated = false
    const checkToken = async () => {
        try {
            const token = await getToken();
            console.log(token)

            if (token != null) {
                isAuthenticated = true
                router.navigate("/welcome/WelcomePage");

            } else {
                isAuthenticated = false
                router.navigate("/login/LoginPage");
            }
        } catch (error) {
            isAuthenticated = false;
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return null;
}