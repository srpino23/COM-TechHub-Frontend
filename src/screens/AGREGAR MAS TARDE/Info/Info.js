import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Info() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Pantalla de Información</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
                                                                                                                                                                                                                                                                                                                                                                          