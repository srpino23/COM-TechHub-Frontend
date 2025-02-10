import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { User, Clock } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [remitos, setRemitos] = useState([]);

  useEffect(() => {
    const fetchedRemitos = [
      {
        id: 1,
        change: "Ejemplo 1",
        team: "Axon",
        user: "Ejemplo 1",
        date: "19 Dic, 2025",
        summary: "Ejemplo 1",
      },
      {
        id: 2,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 3,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 4,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 5,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 6,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 7,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
      {
        id: 8,
        change: "Ejemplo 2",
        team: "Beta",
        user: "Ejemplo 2",
        date: "20 Dic, 2025",
        summary: "Ejemplo 2",
      },
    ];
    setRemitos(fetchedRemitos);
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {remitos.map((remito) => (
          <TouchableOpacity
            key={remito.id}
            style={styles.card}
            onPress={() => navigation.navigate("SubScreen")}
          >
            <View style={styles.infoBox}>
              <Text style={styles.change}>{remito.change}</Text>
              <Text style={styles.team}>{remito.team}</Text>
            </View>
            <View style={styles.basicInfoBox}>
              <View style={styles.info}>
                <User color="#fff" size={24} />
                <Text style={styles.infoText}>{remito.user}</Text>
              </View>
              <View style={styles.info}>
                <Clock color="#fff" size={24} />
                <Text style={styles.infoText}>{remito.date}</Text>
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
    color: "#fff",
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
