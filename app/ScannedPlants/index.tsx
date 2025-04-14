import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PlantCard } from "@/components/PlantCard";

export default function ScannedPlants() {
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const uri = typeof params.uri === "string" ? params.uri : "";

  useEffect(() => {
    if (uri) {
      setLoading(true);
      setTimeout(() => setLoading(false), 5000);
    }
  }, [uri]);

  return (
    <ScrollView className="flex-1  bg-white">
      {uri ? (
        <View className="w-[100%] rounded-lg ">
          <Image
            source={{ uri: encodeURI(uri) }}
            className="w-[100%] h-[400px] rounded-b-[50px]"
          />
          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.analyzingText}>Scanning...</Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noImage}>No Image</Text>
      )}

      <View className="pl-5 pt-3">
        <Text className="text-2xl font-bold">Hydrangea Macrophylla </Text>
      </View>
      <View className="flex-row p-5  items-center gap-2">
        <View className="bg-gray-200 rounded-xl p-1 ">
          <Text>Garden</Text>
        </View>
        <View className="bg-gray-200 rounded-xl p-1">
          <Text>Ornanment</Text>
        </View>
      </View>
      <View className="p-5">
        <Text className="text-2xl ">Description</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo
          eveniet magni accusamus cumque, alias voluptatem quam deleniti ut
          ratione suscipit quia officia cupiditate eaque, ea sed, quibusdam
          animi quo!
        </Text>
      </View>
      <View className="mt-10">
        <View className="border-b-2 border-gray-300" />

        <View className="flex-row flex-wrap p-3 gap-2">
          <View className="w-[48%] h-[100px] bg-green-300"></View>
          <View className="w-[48%] h-[100px] bg-red-300"></View>
          <View className="w-[48%] h-[100px] bg-red-300"></View>
          <View className="w-[48%] h-[100px] bg-green-300"></View>
        </View>
      </View>
      <TouchableOpacity className="flex justify-center items-center m-5 h-[50px] rounded-lg bg-[#00BA00]">
        <Text className="text-white font-medium">Chat to PlantSeek!</Text>
      </TouchableOpacity>

      <View className="border-b-2 border-gray-300 mt-5" />

      <View className="p-5 mt-10">
        <Text>Related Plants</Text>
      </View>

      <View className="flex-row flex-wrap gap-1  justify-center">
        {/* <PlantCard className="w-[48%] h-[150px] " bg="red" />
        <PlantCard className="w-[48%] h-[150px] " bg="red" />
        <PlantCard className="w-[48%] h-[150px] " bg="red" />
        <PlantCard className="w-[48%] h-[150px] " bg="red" />
        <PlantCard className="w-[48%] h-[150px] " bg="red" />
        <PlantCard className="w-[48%] h-[150px] " bg="red" /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333", // Darker text for contrast
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Slightly transparent overlay
    borderRadius: 100, // Match the image's rounded corners
  },
  analyzingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff", // White text for readability on dark background
  },
  noImage: {
    fontSize: 18,
    color: "#ff0000", // Red color for no image error
    textAlign: "center",
  },
});
