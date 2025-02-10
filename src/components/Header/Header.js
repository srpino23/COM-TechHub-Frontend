import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>[ Tech HUB ]</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1f",
    padding: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
