import React from "react";
import { categories } from "@/constants/categories";
import { api } from "@/convex/_generated/api";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "convex/react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Plant } from "@/types/Plant";

export default function HomeScreen() {
  const getSuggestedPlant = useQuery(
    api.plant.getSuggested.getSuggestedPlants,
    {
      category: "EdiblePlant",
      sunlight: "Full Sun",
      humidityPreference: "Moderate",
    }
  ) as Plant[] | undefined;

  const { user } = useAuth();
  const username = user?.username || "Plant Lover";
  const firstName = username.split(" ")[0];
  const router = useRouter();

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const handleViewPlantDetail = (plant: any) => {
    router.push({
      pathname: "/plant-detail/[plant]",
      params: {
        plant: JSON.stringify(plant),
      },
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView className="flex-1 bg-white">
        {/* Header Section */}
        <View className="px-5 pt-12 pb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500">Good {getTimeOfDay()}!</Text>
            </View>
            <View className="flex-row gap-4">
              <Link
                className="w-10 h-10 flex-col items-center "
                href={{
                  pathname: "/chat-ai/[index]",
                  params: { index: "" },
                }}
              >
                <View className="flex-col items-center">
                  <Image
                    source={require("@/assets/images/ai-logo.png")}
                    className="w-10 h-10 rounded-full"
                    resizeMode="cover"
                  />
                  <Text className="text-[10px]">FlorAI</Text>
                </View>
              </Link>
              <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Ionicons
                  name="notifications-sharp"
                  size={22}
                  color="#4CAF50"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
                onPress={() => router.replace("/Search")}
              >
                <Ionicons name="search" size={22} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View className="flex-row flex-wrap justify-between px-4">
          {categories.slice(0, 4).map((item, index) => {
            const plantCount =
              index === 0
                ? "10 Plants"
                : index === 1
                  ? "10 Plants"
                  : index === 2
                    ? "10 Plants"
                    : "10 Plants";

            const borderColor =
              index === 0 || index === 2 ? "#E91E63" : "#4CAF50";

            const categoryName =
              index === 0
                ? "Garden"
                : index === 1
                  ? "Popular"
                  : index === 2
                    ? "Indoor"
                    : "Outdoor";

            return (
              <Link
                key={index}
                href={{
                  pathname: "/Categories/[category]",
                  params: { category: item.category },
                }}
                asChild
              >
                <TouchableOpacity className="w-[48%] mb-4">
                  <View
                    className="rounded-xl overflow-hidden bg-white"
                    style={{
                      borderLeftWidth: 4,
                      borderLeftColor: borderColor,
                    }}
                  >
                    <View className="flex-row items-center p-3">
                      <Image
                        source={item.image}
                        className="w-12 h-12 mr-3"
                        resizeMode="contain"
                      />
                      <View>
                        <Text className="text-xs text-gray-500">
                          {plantCount}
                        </Text>
                        <Text className="text-base font-semibold text-gray-800 mt-1">
                          {categoryName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>

        {/* Suggested Plants Section */}
        <View className="px-5 pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Suggested</Text>
            <TouchableOpacity>
              <Text className="text-green-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {!getSuggestedPlant && (
            <View className="h-40 items-center justify-center">
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text className="text-gray-500 mt-2">
                Finding perfect plants for you...
              </Text>
            </View>
          )}

          <View className="flex-row flex-wrap justify-between">
            {getSuggestedPlant?.map((plant, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] mb-4"
                onPress={() => handleViewPlantDetail(plant)}
              >
                <View className="rounded-2xl bg-gray-50 overflow-hidden shadow-sm">
                  <View className="h-40 items-center justify-center bg-white">
                    <Image
                      source={{ uri: plant.url }}
                      className="w-32 h-32"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="p-3">
                    <View className="flex-row items-center mb-1">
                      <View
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            plant.category === "EdiblePlant"
                              ? "#4CAF50"
                              : "#FF9800",
                        }}
                      />
                      <Text className="text-xs text-gray-500">
                        {plant.category}
                      </Text>
                    </View>
                    <Text
                      className="text-lg font-bold text-gray-800"
                      numberOfLines={1}
                    >
                      {plant.common_name}
                    </Text>

                    <View className="flex-row items-center mt-2">
                      <View className="flex-row items-center mr-3">
                        <Ionicons
                          name="sunny-outline"
                          size={14}
                          color="#FF9800"
                        />
                        <Text className="text-xs text-gray-500 ml-1">
                          {plant.sunlight}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="water-outline"
                          size={14}
                          color="#2196F3"
                        />
                        <Text className="text-xs text-gray-500 ml-1">
                          {plant.humidityPreference}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
