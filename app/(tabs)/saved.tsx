import SavedCard from "@/components/SavedCard";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function saved() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Saved</Text>
      </View>
      <View style={styles.cardWrapper}>
        <SavedCard label="All Pins" numberSaved="45" category="All Pins" />
        <SavedCard label="Indoor" numberSaved="10" category="Indoor" />
        <SavedCard label="Outdoor" numberSaved="32" category="Outdoor" />
        <SavedCard label="Garden" numberSaved="4" category="Garden" />
        <SavedCard label="Outdoor" numberSaved="15" category="All Pins" />
        <SavedCard label="Outdoor" numberSaved="15" category="All Pins" />
        <SavedCard label="Outdoor" numberSaved="35" category="All Pins" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  cardHeader: {
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: 28,
    padding: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    width: "auto",
    gap: 8,
  },
});
