import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

export default function SubHeader({ title }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft color="white" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1b1b1f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    flexDirection: "row",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    padding: 10,
  },
});