import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Archive, List, Settings, Info } from "lucide-react-native";

export default function Options() {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button}>
          <Archive color="#f56565" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <List color="#f56565" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Settings color="#f56565" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Info color="#f56565" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  grid: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  button: {
    width: "43%",
    height: 150,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: "#1b1b1f",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    height: "100%",
  },
});
