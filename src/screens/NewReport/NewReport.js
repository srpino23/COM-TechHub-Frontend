import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import SubHeader from "../../components/SubHeader/SubHeader";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Camera,
  RefreshCcw,
  X,
  CheckCircle,
  PlusCircle,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function NewReport({ route }) {
  const { reportId } = route.params;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [endTime, setEndTime] = useState(null);
  const [supplies, setSupplies] = useState([]);
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [changes, setChanges] = useState("");

  const isFormComplete = supplies && summary && location && changes && photo;

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setCameraVisible(false); // Cerrar la cámara después de tomar la foto
    }
  }

  async function finishReport() {
    try {
      const formData = new FormData();
      formData.append("id", reportId);
      formData.append("endTime", endTime || new Date().toISOString());
      supplies.forEach((supply, index) => {
        formData.append(`supplies[${index}][name]`, supply.name);
        formData.append(`supplies[${index}][quantity]`, supply.quantity);
      });
      formData.append("summary", summary);
      formData.append("location", location);
      formData.append("changes", changes);

      if (photo) {
        const response = await fetch(photo);
        const blob = await response.blob();
        formData.append("image", {
          uri: photo,
          type: blob.type,
          name: `${reportId}.${blob.type.split("/")[1]}`,
        });
      }

      const response = await axios.post(
        "http://172.25.67.77:2300/api/report/finishJob",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Report finished:", response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error finishing report:", error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error(
          "Error finishing report: No response received",
          error.request
        );
      } else {
        // Algo sucedió al configurar la solicitud
        console.error("Error finishing report:", error.message);
      }
    }
  }

  function updateSupply(index, key, value) {
    const updatedSupplies = [...supplies];
    updatedSupplies[index][key] = value;
    setSupplies(updatedSupplies);
  }

  return (
    <View style={styles.screen}>
      <SubHeader title={"Nuevo Informe"} />
      <View style={styles.container}>
        <Text style={styles.title}>Informes</Text>
        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          placeholderTextColor="#888"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Cambios"
          placeholderTextColor="#888"
          value={changes}
          onChangeText={setChanges}
        />
        <TextInput
          style={styles.input}
          placeholder="Resumen"
          placeholderTextColor="#888"
          value={summary}
          onChangeText={setSummary}
        />
        <FlatList
          data={supplies}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.supplyRow}>
              <TextInput
                style={styles.input}
                placeholder="Suministro"
                placeholderTextColor="#888"
                value={item.name}
                onChangeText={(text) => updateSupply(index, "name", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                placeholderTextColor="#888"
                value={item.quantity}
                keyboardType="numeric"
                onChangeText={(text) => updateSupply(index, "quantity", text)}
              />
            </View>
          )}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              setSupplies([...supplies, { name: "", quantity: "" }])
            }
          >
            <PlusCircle color="white" size={32} />
            <Text style={styles.addButtonText}>Agregar suministros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCameraVisible(true)}
          >
            <Camera color="white" size={32} />
          </TouchableOpacity>
        </View>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        {isFormComplete && (
          <TouchableOpacity style={styles.halfButton} onPress={finishReport}>
            <CheckCircle color="white" size={32} />
          </TouchableOpacity>
        )}
      </View>
      {cameraVisible && (
        <View style={styles.fullScreenCamera}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <RefreshCcw color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Camera color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCameraVisible(false)}
              >
                <X color="white" size={32} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "48%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#333",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#555",
  },
  supplyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addButton: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#444",
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfButton: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#444",
    borderRadius: 10,
    width: "48%",
  },
  fullScreenCamera: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 10,
  },
  photo: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
