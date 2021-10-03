//No arquivo android/app/build.gradle adicionar a 
//linha missingDimensionStrategy 'react-native-camera', 'general' 
// nas configurações default
// No android/app/src/main/AndroidManifest.xml adicionar:
// <uses-permission android:name="android.permission.CAMERA" />

import React, { useState, useEffect } from "react";
import {
    Text,
    Alert,
    Modal,
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
//Importando o componente da camera
import { RNCamera } from "react-native-camera";


const Camera = ({ isVisible, onChangePhoto, onCloseCamera }) => {
    const [camera, setCamera] = useState();
    const onTakePicture = async () => {
        try {
            const { uri } = await camera.takePictureAsync({
                quality: 0.5,
                forceUpOrientation: true,
                fixOrientation: true,
                skipProcessing: true
            });
            onChangePhoto(uri);
        } catch (error) {
            Alert.alert("Erro", "Houve um erro ao tirar a foto.");
        }
    };
    return (
        <Modal animationType="slide" transparent={false} visible={isVisible}>
            <RNCamera
                ref={ref => setCamera(ref)}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: "Permissão para usar a câmera",
                    message: "Precisamos da sua permissão para usar a câmera.",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancelar"
                }}
                captureAudio={false}
            >
                <Icon
                    name="photo-camera"
                    size={40}
                    color={"#fff"}
                    onPress={onTakePicture}
                    style={styles.buttonTakePicture}
                />
                <Icon
                    name="close"
                    size={50}
                    color={"#fff"}
                    onPress={onCloseCamera}
                    style={styles.buttonCloseCamera}
                />
            </RNCamera>
        </Modal>
    );
};
const App = () => {
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [photo, setPhoto] = useState(null);
    const onChangePhoto = newPhoto => {
        setPhoto(newPhoto);
        setIsCameraVisible(false);
    };
    const onCloseCamera = () => {
        setIsCameraVisible(false);
    };
   

    return (
        <View style={styles.container}>

            <View style={styles.photo}>
                <ImageBackground
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: photo }}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setIsCameraVisible(true);
                    }}
                >
                    <Icon name="camera-alt" size={40} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setPhoto(null);
                    }}
                >
                    <Icon name="delete" size={40} color={"black"} />
                </TouchableOpacity>
    
            </View>
        
            <Camera
                isVisible={isCameraVisible}
                onChangePhoto={onChangePhoto}
                onCloseCamera={onCloseCamera}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: 300,
        height: 200,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginTop: 80
    },
    buttons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 150,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTakePicture: {
        flex: 0,
        alignSelf: "center",
        position: "absolute",
        bottom: 20
    },
    buttonCloseCamera: {
        flex: 0,
        position: "absolute",
        top: 20,
        right: 20
    },
});
export default App;