import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import SubHeader from "../../components/SubHeader/SubHeader";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Camera, RefreshCcw, X } from 'lucide-react-native';

export default function NewReport() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setCameraVisible(false); // Cerrar la cámara después de tomar la foto
    }
  }

  return (
    <View style={styles.screen}>
      <SubHeader title={"Nuevo Informe"} />
      <View style={styles.container}>
        <Text style={styles.title}>Informes</Text>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <Button title="Abrir Cámara" onPress={() => setCameraVisible(true)} />
        {cameraVisible && (
          <View style={styles.fullScreenCamera}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                  <RefreshCcw color="white" size={32} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <Camera color="white" size={32} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setCameraVisible(false)}>
                  <X color="white" size={32} />
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  fullScreenCamera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});
