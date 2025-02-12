import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { User, Clock } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();
  const [remitos, setRemitos] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        const response = await axios.get(
          "http://172.25.67.77:2300/api/report/getReports"
        );
        const filteredReports = response.data.filter(
          (report) => report.team === user.team
        );
        setRemitos(filteredReports);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {remitos.slice().reverse().map((remito) => (
          <TouchableOpacity
            key={remito._id}
            style={styles.card}
            onPress={() => navigation.navigate("Details", { remito })}
          >
            <View style={styles.infoBox}>
              <Text style={styles.change}>{remito.changes}</Text>
              <Text style={styles.team}>{remito.team}</Text>
            </View>
            <View style={styles.basicInfoBox}>
              <View style={styles.info}>
                <User color="#fff" size={24} />
                <Text style={styles.infoText}>{remito.name}</Text>
              </View>
              <View style={styles.info}>
                <Clock color="#fff" size={24} />
                <Text style={styles.infoText}>
                  {new Date(remito.date).toLocaleString("es-ES", {
                    timeZone: "UTC",
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.summary}>{remito.summary}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#1b1b1f",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  change: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  team: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f56565",
    padding: 5,
    borderRadius: 5,
  },
  basicInfoBox: {
    gap: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  infoText: {
    color: "#b0b0b0",
    fontSize: 14,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginVertical: 10,
  },
  summary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
