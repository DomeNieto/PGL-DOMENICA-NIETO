import axios from "axios";
import { getToken } from "./AsyncStorageService";
import { RequestService } from "./RequestService";

const API_URL = "http://192.168.0.14:5000"

const fetchPhotos = async () => {
    const token = await getToken();
    const cleanedToken = token!.replace(/['"]+/g, '');
    try {
        const response = await axios.get(`${API_URL}/images/get-all`, {
            headers: {
                Authorization: `Bearer ${cleanedToken}`,
            },
        });
        return response.data.object;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error en la solicitud:", error.response?.data || error.message);
        } else {
            console.log('Error fetching images:', error);
        }
        return [];
    }
};

const postPhotos = async (encodedData: String, width: number, height: number) => {
    try {
        const response = await fetch(
            `${API_URL}/images/save`,
            await RequestService.initPostPhotos(encodedData, width, height)
        );
        return await response.json();

    } catch (error: any) {
        console.error('Error uploading image:', error);
    }
};


export const CameraService = {
    fetchPhotos,
    postPhotos
}