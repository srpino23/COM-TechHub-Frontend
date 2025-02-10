import { View, Text, StyleSheet } from "react-native";

import SubHeader from "../../components/SubHeader/SubHeader";

export default function Details() {
  return (
    <View style={styles.screen}>
      <SubHeader title={"Detalles"} />
      <View style={styles.container}>
        <Text style={styles.title}>Detalles</Text>
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
});
