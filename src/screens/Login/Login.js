import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://172.25.67.77:2300/api/user/login", {
        name,
        password,
      });
      if (response.status === 200) {
        onLogin();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Detalles</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});