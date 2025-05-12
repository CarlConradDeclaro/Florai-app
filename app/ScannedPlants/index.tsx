import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { getPredictedImageDetails } from "@/services/predicted-image";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ScannedPlants() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const uri = typeof params.uri === "string" ? params.uri : "";
  const classification = params.classification;
  const [activeTab, setActiveTab] = useState("description");

  let flowerName = ""; // Default value for flower name

  if (typeof classification === "string") {
    // If classification is a string, parse it into an object
    const parsedClassification = JSON.parse(classification);
    flowerName = parsedClassification.flower_name || "Unknown Flower";
  }

  const [details, setDetails] = useState();
  const [relatedPlants, setRelatedPlants] = useState([
    { name: "Sunflower", image: "https://placeholder.com/150" },
    { name: "Daisy", image: "https://placeholder.com/150" },
    { name: "Rose", image: "https://placeholder.com/150" },
    { name: "Tulip", image: "https://placeholder.com/150" },
  ]);

  useEffect(() => {
    handlePredictedImageDetails();
  }, []);

  useEffect(() => {
    if (details) {
      // Add a slight delay to make the loading animation more noticeable
      setTimeout(() => setLoading(false), 800);
    }
  }, [details]);

  const handlePredictedImageDetails = async () => {
    const res = await getPredictedImageDetails(flowerName);
    console.log("ai response:", res);
    setDetails(res);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <View className="p-5">
            {details ? (
              <>
                {/* Branding */}
                <View className="p-3 bg-gray-50 rounded-lg flex-row items-center">
                  <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-bold">FI</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Powered by</Text>
                    <Text className="font-bold text-gray-700">FlorAI</Text>
                  </View>
                </View>
                <Markdown style={markdownStyles}>{details}</Markdown>
              </>
            ) : (
              <View className="items-center py-10">
                <ActivityIndicator size="small" color="#00BA00" />
                <Text className="text-gray-500 mt-2">
                  Retrieving plant information...
                </Text>
              </View>
            )}
          </View>
        );
      case "care":
        return (
          <View className="p-5">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="water" size={24} color="#3498db" />
              </View>
              <View>
                <Text className="font-bold text-lg">Watering</Text>
                <Text className="text-gray-600">
                  Water once a week, allow soil to dry between waterings
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="sunny" size={24} color="#f1c40f" />
              </View>
              <View>
                <Text className="font-bold text-lg">Light</Text>
                <Text className="text-gray-600">
                  Prefers bright, indirect sunlight
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="leaf" size={24} color="#2ecc71" />
              </View>
              <View>
                <Text className="font-bold text-lg">Soil</Text>
                <Text className="text-gray-600">
                  Well-draining soil with organic matter
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="thermometer" size={24} color="#e74c3c" />
              </View>
              <View>
                <Text className="font-bold text-lg">Temperature</Text>
                <Text className="text-gray-600">
                  65-75°F (18-24°C), avoid cold drafts
                </Text>
              </View>
            </View>
          </View>
        );
      case "uses":
        return (
          <View className="p-5">
            <View className="bg-green-50 p-4 rounded-lg mb-4">
              <Text className="font-bold text-lg mb-2">Medicinal Uses</Text>
              <Text className="text-gray-700">
                This plant has been traditionally used for treating headaches
                and minor skin irritations. Always consult with a healthcare
                professional before using any plant for medicinal purposes.
              </Text>
            </View>

            <View className="bg-blue-50 p-4 rounded-lg mb-4">
              <Text className="font-bold text-lg mb-2">Culinary Uses</Text>
              <Text className="text-gray-700">
                The flowers can be used as a garnish in salads or desserts. The
                leaves can be steeped to make an aromatic tea.
              </Text>
            </View>

            <View className="bg-purple-50 p-4 rounded-lg">
              <Text className="font-bold text-lg mb-2">Ornamental Value</Text>
              <Text className="text-gray-700">
                Popular in garden borders and container arrangements. Attractive
                to pollinators like butterflies and bees.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        {/* Header with back button */}
        <View className="absolute z-10 top-10 left-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Image container with gradient overlay */}
        {uri ? (
          <View className="w-full relative">
            <Image
              source={{ uri: encodeURI(uri) }}
              className="w-full h-[380px]"
              style={styles.heroImage}
            />
            <View style={styles.imageGradient} />

            {loading && (
              <View style={styles.overlay}>
                <View className="bg-white/90 p-6 rounded-3xl items-center">
                  <ActivityIndicator size="large" color="#00BA00" />
                  <Text className="text-lg font-medium mt-3 text-gray-800">
                    Identifying plant...
                  </Text>
                </View>
              </View>
            )}

            {!loading && (
              <View className="absolute bottom-0 left-0 right-0 p-5">
                <Text className="text-white text-3xl font-bold shadow-text mb-1">
                  {flowerName[0].toUpperCase() + flowerName.slice(1)}
                </Text>
                <Text className="text-white/80 text-base shadow-text">
                  Scientific family • Native to temperate regions
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className="h-[200px] bg-gray-200 items-center justify-center">
            <Ionicons name="image-outline" size={48} color="#999" />
            <Text className="text-gray-500 mt-2">No Image Available</Text>
          </View>
        )}

        {/* Information badges */}
        {!loading && (
          <View className="flex-row justify-around py-4 bg-white shadow-sm mx-3 -mt-6 rounded-2xl">
            <View className="items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="sunny-outline" size={20} color="#00BA00" />
              </View>
              <Text className="text-xs text-gray-600">Full Sun</Text>
            </View>

            <View className="items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="water-outline" size={20} color="#3498db" />
              </View>
              <Text className="text-xs text-gray-600">Weekly</Text>
            </View>

            <View className="items-center">
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mb-1">
                <Ionicons
                  name="thermometer-outline"
                  size={20}
                  color="#e74c3c"
                />
              </View>
              <Text className="text-xs text-gray-600">65-75°F</Text>
            </View>

            <View className="items-center">
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mb-1">
                <Ionicons name="flower-outline" size={20} color="#9b59b6" />
              </View>
              <Text className="text-xs text-gray-600">Summer</Text>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200 mt-4">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "description" ? "border-b-2 border-green-500" : ""}`}
            onPress={() => setActiveTab("description")}
          >
            <Text
              className={`font-medium ${activeTab === "description" ? "text-green-500" : "text-gray-500"}`}
            >
              Description
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "care" ? "border-b-2 border-green-500" : ""}`}
            onPress={() => setActiveTab("care")}
          >
            <Text
              className={`font-medium ${activeTab === "care" ? "text-green-500" : "text-gray-500"}`}
            >
              Care Guide
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "uses" ? "border-b-2 border-green-500" : ""}`}
            onPress={() => setActiveTab("uses")}
          >
            <Text
              className={`font-medium ${activeTab === "uses" ? "text-green-500" : "text-gray-500"}`}
            >
              Uses
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        {renderTabContent()}

        {/* Chat button */}
        {!loading && (
          <>
            <Link
              href={{
                pathname: "/chat-ai/[index]",
                params: { index: "" },
              }}
              className=" flex-row justify-center items-center h-[54px] rounded-xl bg-[#00BA00]  m-3 "
            >
              <View className="flex-row justify-center items-center h-full w-full">
                <Ionicons name="chatbubble-outline" size={20} color="white" />
                <Text className="text-white font-medium ml-2 text-lg">
                  Chat with FlorAI
                </Text>
              </View>
            </Link>

            {/* Related plants */}
            <View className="mt-2 mb-8">
              <Text className="text-xl font-bold px-5 mb-3">
                Related Plants
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
              >
                {relatedPlants.map((plant, index) => (
                  <TouchableOpacity
                    key={index}
                    className="mr-4 items-center"
                    activeOpacity={0.8}
                  >
                    <View className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <View className="w-full h-full bg-green-200 items-center justify-center">
                        <Ionicons name="leaf" size={32} color="#00BA00" />
                      </View>
                    </View>
                    <Text className="text-center font-medium">
                      {plant.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: "transparent",
    backgroundGradient:
      "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  heading1: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#222",
  },
  heading2: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 24,
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemContent: {
    marginLeft: 8,
  },
};
