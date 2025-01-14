import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";


import { RenderManagerContext } from "../../context/RenderManagerContext";
import { colors } from "../../styles/Colors";
import QRCode from "react-native-qrcode-svg";


const MyQRCodePage = () => {
    const { darkMode } = useContext(RenderManagerContext);

    return (
        <View style={[
            styles.QRContainer,
            { backgroundColor: darkMode ? colors.primaryDarkColor : colors.primaryLightColor },
        ]}>
            <QRCode
                value="https://github.com/DomeNieto"
                size={200}
                backgroundColor={darkMode ? colors.primaryDarkColor : colors.primaryLightColor}
                color={darkMode ? colors.primaryLightColor : colors.primaryDarkColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    QRContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "50%",
    },
});

export default MyQRCodePage;
