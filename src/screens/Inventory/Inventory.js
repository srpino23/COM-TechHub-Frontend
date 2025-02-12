import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

export default function Inventory() {
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [history, setHistory] = useState([]);
  const [team, setTeam] = useState("");

  const addMaterial = () => {
    if (
      !materialName ||
      !quantity ||
      isNaN(quantity) ||
      Number(quantity) <= 0
    ) {
      Alert.alert(
        "Error",
        "Por favor ingrese un nombre y una cantidad válida."
      );
      return;
    }

    setMaterials((prevMaterials) => {
      const existingMaterial = prevMaterials.find(
        (mat) => mat.name === materialName
      );
      if (existingMaterial) {
        return prevMaterials.map((mat) =>
          mat.name === materialName
            ? { ...mat, quantity: mat.quantity + parseInt(quantity) }
            : mat
        );
      }
      return [
        ...prevMaterials,
        { name: materialName, quantity: parseInt(quantity) },
      ];
    });

    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: "Ingreso",
        name: materialName,
        quantity: parseInt(quantity),
        timestamp: new Date().toLocaleString(),
      },
    ]);

    setMaterialName("");
    setQuantity("");
  };

  const withdrawMaterial = () => {
    if (
      !materialName ||
      !quantity ||
      !team ||
      isNaN(quantity) ||
      Number(quantity) <= 0
    ) {
      Alert.alert("Error", "Complete todos los campos correctamente.");
      return;
    }

    setMaterials((prevMaterials) => {
      return prevMaterials.map((mat) => {
        if (mat.name === materialName) {
          if (mat.quantity >= parseInt(quantity)) {
            return { ...mat, quantity: mat.quantity - parseInt(quantity) };
          } else {
            Alert.alert("Error", "Cantidad insuficiente en el stock.");
            throw new Error("Cantidad insuficiente");
          }
        }
        return mat;
      });
    });

    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: "Retiro",
        name: materialName,
        quantity: parseInt(quantity),
        team,
        timestamp: new Date().toLocaleString(),
      },
    ]);

    setMaterialName("");
    setQuantity("");
    setTeam("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Stock</Text>

      <TextInput
        placeholder="Nombre del Material"
        placeholderTextColor="#aaa"
        value={materialName}
        onChangeText={setMaterialName}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad"
        placeholderTextColor="#aaa"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Equipo (solo para retiros)"
        placeholderTextColor="#aaa"
        value={team}
        onChangeText={setTeam}
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <Button title="Ingresar Material" onPress={addMaterial} />
        <Button
          title="Retirar Material"
          onPress={withdrawMaterial}
          color="orange"
        />
      </View>

      <Text style={styles.subtitle}>Materiales Disponibles</Text>
      <FlatList
        data={materials}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            {item.name}: {item.quantity}
          </Text>
        )}
      />

      <Text style={styles.subtitle}>Historial de Movimientos</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            [{item.timestamp}] {item.action}: {item.name} ({item.quantity}){" "}
            {item.team ? `-> Equipo: ${item.team}` : ""}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#ffffff",
  },
  listItem: {
    padding: 10,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 5,
    color: "#ffffff",
  },
  historyItem: {
    padding: 10,
    backgroundColor: "#444",
    marginVertical: 5,
    borderRadius: 5,
    color: "#ffffff",
  },
});
