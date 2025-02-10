import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Router from "../../components/Router/Router";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Header from "../../components/Header/Header";

export default function App() {
  const [screen, setScreen] = useState("Home");

  return (
    <View style={styles.container}>
      <Header />
      <Router screen={screen} />
      <NavigationBar setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});
