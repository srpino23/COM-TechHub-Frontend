import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
      "http://172.25.67.77:2300/api/user/login",
      {
        name,
        password,
      }
    );
    if (response.status === 200) {
      const userData = response.data.user;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      onLogin();
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>[ Tech HUB]</Text>
        <View style={styles.inputContainer}>
          <User style={styles.icon} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Lock style={styles.icon} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>iniciar Sesión</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#1e1e1e",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#fff",
  },
  button: {
    width: "80%",
    backgroundColor: "#f56565",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
