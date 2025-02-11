import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Plus, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function NavigationBar({ setScreen }) {
  const navigation = useNavigation();

  async function createNewReport() {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        const user = JSON.parse(userData);
        const response = await axios.post('http://172.25.67.77:2300/api/report/createReport', {
          name: user.name,
          surname: user.surname,
          team: user.team,
          startTime: new Date().toISOString(),
        });
        console.log('Report created:', response.data);
        navigation.navigate("NewReport", { reportId: response.data._id });
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error creating report:', error);
    }
  }

  return (
    <View style={styles.navContainer}>
      <View style={styles.navButtonContainer}>
        <TouchableOpacity
          onPress={() => setScreen("Home")}
          style={styles.navButton}
        >
          <Home color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("Options")}
          style={styles.navButton}
        >
          <Settings color="#fff" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.plusButton} onPress={createNewReport}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1f",
    width: "100%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    position: "relative",
    zIndex: 1,
  },
  navButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  navButton: {
    padding: 20,
  },
  plusButton: {
    padding: 20,
    backgroundColor: "#f56565",
    borderRadius: 50,
    position: "absolute",
    bottom: 30,
    zIndex: 1,
  },
});
