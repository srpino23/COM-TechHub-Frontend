import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SubHeader from "../../components/SubHeader/SubHeader";

export default function Inventory() {
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [history, setHistory] = useState([]);
  const [team, setTeam] = useState("");
  const [filterMaterial, setFilterMaterial] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTeam, setFilterTeam] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.team) {
          setTeam(user.team);
        }
      }
    };
    fetchTeam();
  }, []);

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
        (mat) => mat.name.toLowerCase() === materialName.toLowerCase()
      );
      if (existingMaterial) {
        return prevMaterials.map((mat) =>
          mat.name.toLowerCase() === materialName.toLowerCase()
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
        if (mat.name.toLowerCase() === materialName.toLowerCase()) {
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
  };

  const filteredMaterials = materials.filter((mat) =>
    mat.name.toLowerCase().includes(filterMaterial.toLowerCase())
  );

  const filteredHistory = history.filter((entry) => {
    const matchesMaterial = filterMaterial
      ? entry.name.toLowerCase().includes(filterMaterial.toLowerCase())
      : true;
    const matchesDate = filterDate
      ? entry.timestamp.includes(filterDate)
      : true;
    const matchesTeam = filterTeam ? entry.team === filterTeam : true;
    return matchesMaterial && matchesDate && matchesTeam;
  });

  return (
    <View style={styles.screen}>
      <SubHeader title={"Inventario"} />
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
        <View style={styles.buttonRow}>
          <TouchableOpacity
            title="+"
            style={[styles.button, { backgroundColor: "#77dd77" }]}
            onPress={addMaterial}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff6961" }]}
            onPress={withdrawMaterial}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Materiales Disponibles</Text>
        <TextInput
          placeholder="Filtrar por Nombre"
          placeholderTextColor="#aaa"
          value={filterMaterial}
          onChangeText={setFilterMaterial}
          style={styles.input}
        />
        <FlatList
          data={filteredMaterials}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>
              {item.name}: {item.quantity}
            </Text>
          )}
        />

        <Text style={styles.subtitle}>Historial de Movimientos</Text>
        <TextInput
          placeholder="Filtrar por Fecha (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={filterDate}
          onChangeText={setFilterDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Filtrar por Equipo"
          placeholderTextColor="#aaa"
          value={filterTeam}
          onChangeText={setFilterTeam}
          style={styles.input}
        />
        <FlatList
          data={filteredHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.historyItem}>
              [{item.timestamp}] {item.action}: {item.name} ({item.quantity}){" "}
              {item.team ? `-> Equipo: ${item.team}` : ""}
            </Text>
          )}
        />
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
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#5C5C5C",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
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
