import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import SubHeader from "../../components/SubHeader/SubHeader";

export default function NewReport() {
  return (
    <View style={styles.screen}>
      <SubHeader title={"Nuevo Informe"} />
      <View style={styles.container}>
        <Text style={styles.title}>Informes</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Cargar Imagen</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Descripción del problema"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Material utilizado"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Aclaraciones y extras"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Hora de finalización"
          placeholderTextColor="#888"
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
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    color: "white",
  },
  button: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#6200ee",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
