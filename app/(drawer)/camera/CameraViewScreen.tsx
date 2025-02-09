import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, Text, TouchableOpacity, View, StyleSheet, Pressable } from "react-native";
import { colors } from "../../../styles/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Photo {
    id: number;
    width: number;
    height: number;
    encodedData: string;
}


const CameraViewScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');

    const [cameraOpen, setCameraOpen] = useState(false);
    const cameraRef = useRef<CameraView | null>(null);

    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    useEffect(() => {

    }, [cameraPermission]);


    if (!cameraPermission?.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Necesitamos los permisos necesarios para acceder a tu camara</Text>
                <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
                    <Text style={styles.permissionButtonText}>
                        Obtener permisos
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPhotos}>
                No hay fotos disponibles
            </Text>
            <TouchableOpacity style={styles.captureButton} onPress={() => setCameraOpen(true)}>
                <Text style={styles.text}>Abrir camara</Text>
            </TouchableOpacity>
            <Modal visible={cameraOpen} animationType="slide">
                <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
                </CameraView>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
                        <Ionicons name="camera-reverse" size={40} color={colors.bottomLightColor} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="disc" size={55} color={colors.bottomLightColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCameraOpen(false)}>
                        <Ionicons name="close-circle" size={45} color={colors.bottomLightColor} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );


}

export default CameraViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }, camera: {
        flex: 1,
        justifyContent: "space-between",
        borderWidth: 10,
        borderColor: colors.bottomDarkColor
    }, captureButton: {
        backgroundColor: colors.bottomLightColor,
        height: 70,
        borderRadius: 7,
    }, text: {
        color: 'white',
        fontSize: 18,
        margin: 20,
    }, thumbnail: {
        width: 105,
        height: 105,
        margin: 5
    }, button: {
        flexDirection: "row",
        padding: 20,
        paddingHorizontal: 40,
        backgroundColor: colors.bottomDarkColor,
        gap: 67
    }, permissionContainer: {
        justifyContent: "center",
        flex: 1,
        width: 300,
        alignSelf: "center"
    }, permissionButton: {
        backgroundColor: colors.bottomLightColor,
        padding: 15,
        borderRadius: 7,
    }, permissionButtonText: {
        color: colors.primaryLightColor,
        fontSize: 17,
        textAlign: "center",
    }, permissionText: {
        textAlign: "center",
        fontSize: 15,
        marginBottom: 20
    }, textPhotos: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20
    }
});
