import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import App from "./screens/App/App";
import SubScreen from "./screens/Details/Details";
import NewReport from "./screens/NewReport/NewReport";

const Stack = createStackNavigator();

export default function Main() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="SubScreen" component={SubScreen} />
          <Stack.Screen name="NewReport" component={NewReport} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});