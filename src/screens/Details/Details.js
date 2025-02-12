import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import SubHeader from "../../components/SubHeader/SubHeader";

export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();
  const { remito } = route.params;

  const isAnyFieldEmpty =
    !remito._id ||
    !remito.name ||
    !remito.surname ||
    !remito.team ||
    !remito.supplies.length ||
    !remito.status ||
    !remito.startTime ||
    !remito.date ||
    !remito.changes ||
    !remito.endTime ||
    !remito.location ||
    !remito.summary;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>
        <SubHeader title={"Detalles"} />
        <View style={styles.container}>
          <Text style={styles.title}>Detalles del Remito</Text>
          <Image source={{ uri: remito.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{remito._id}</Text>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>
              {remito.name} {remito.surname}
            </Text>
            <Text style={styles.label}>Equipo:</Text>
            <Text style={styles.value}>{remito.team}</Text>
            <Text style={styles.label}>Suministros:</Text>
            {remito.supplies.map((supply, index) => (
              <Text key={index} style={styles.value}>
                {supply.name}: {supply.quantity}
              </Text>
            ))}
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{remito.status}</Text>
            <Text style={styles.label}>Hora de Inicio:</Text>
            <Text style={styles.value}>{remito.startTime}</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>
              {new Date(remito.date).toLocaleString("es-ES", {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
            <Text style={styles.label}>Cambios:</Text>
            <Text style={styles.value}>{remito.changes}</Text>
            <Text style={styles.label}>Hora de Fin:</Text>
            <Text style={styles.value}>{remito.endTime}</Text>
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{remito.location}</Text>
            <Text style={styles.label}>Resumen:</Text>
            <Text style={styles.value}>{remito.summary}</Text>
          </View>
        </View>
      </ScrollView>
      {isAnyFieldEmpty && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.navigate("NewReport", { reportId: remito._id })
          }
        >
          <Text style={styles.buttonText}>Completar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#292929",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#CCC",
    marginBottom: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#f56565",
    borderRadius: 5,
    padding: 15,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
