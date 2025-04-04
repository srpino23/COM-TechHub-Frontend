import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Main from "./screens/Main/Main";
import Details from "./screens/Details/Details";
import NewReport from "./screens/NewReport/NewReport";
import Login from "./screens/Login/Login";
import Inventory from "./screens/Inventory/Inventory";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setIsLoggedIn(false);
      console.log("Logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main">
              {(props) => <Main {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="NewReport" component={NewReport} />
            <Stack.Screen name="Inventory" component={Inventory} />
          </Stack.Navigator>
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <StatusBar style="light" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
