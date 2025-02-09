import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet, Pressable, Image } from "react-native";
import { colors } from "../../../styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { CameraService } from "../../../service/CameraService";

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

    const [images, setImages] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageVisible, setImageVisible] = useState<String>();

    const loadImages = async () => {
        setLoading(true);
        try {
            const photos = await CameraService.fetchPhotos();
            setImages(photos || []);
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true });
                if (!photo || !photo.base64) {
                    throw new Error("No se pudo capturar la imagen.");
                }
                await CameraService.postPhotos(photo.base64, photo.width, photo.height);
                setCameraOpen(false);
                loadImages();
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    useEffect(() => {
        if (cameraPermission) {
            setLoading(false);
        }
        loadImages()
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
            {loading ? (
                <Text>Cargando</Text>
            ) : images.length > 0 ? (
                <>
                    <FlatList
                        data={images}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setImageVisible(item.encodedData)}>
                                <Image
                                    source={{ uri: `data:image/png;base64,${item.encodedData}` }}
                                    style={styles.thumbnail}
                                />

                            </TouchableOpacity>

                        )}

                    />
                    <Modal visible={!!imageVisible} style={styles.modal}>
                        <TouchableOpacity onPress={() => setImageVisible("")}>
                            <Image
                                source={{ uri: `data:image/png;base64,${imageVisible}` }}
                                style={styles.image}
                            />

                        </TouchableOpacity>

                    </Modal>

                </>
            ) : (
                <Text style={styles.textPhotos}>
                    No hay fotos disponibles
                </Text>
            )}

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
                    <TouchableOpacity onPress={takePicture}>
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
        marginBottom: "10%"
    }, text: {
        color: colors.primaryLightColor,
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
    }, image: {
        width: 300,
        height: 600,
        justifyContent: "center",
        marginHorizontal: "8%",
        marginTop: "25%"
    }, modal: {
        width: "50%",
        backgroundColor: colors.cardsDarkMode,
        padding: 10
    }
});
