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

export default function HomeScreen() {
  const getSuggestedPlant = useQuery(
    api.plant.getSuggested.getSuggestedPlants,
    {
      category: "EdiblePlant",
      sunlight: "Full Sun",
      humidityPreference: "Moderate",
    }
  );

  const { user } = useAuth();
  const username = user?.name || "Plant Lover";
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
              <Text className="text-3xl font-bold text-gray-800 mt-1">
                {firstName}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <Link
                className="w-10 h-10 flex-col items-center "
                href={{
                  pathname: "/chat-ai/[index]",
                  params: { index: "yeah" },
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

          {/* Featured Banner */}
          <TouchableOpacity className="mt-6 overflow-hidden rounded-2xl">
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3",
              }}
              className="h-40 w-full justify-end"
              resizeMode="cover"
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                className="absolute left-0 right-0 bottom-0 h-24"
              />
              <View className="p-4">
                <View className="bg-green-500 self-start px-3 py-1 rounded-full mb-2">
                  <Text className="text-white text-xs font-medium">
                    Tips & Tricks
                  </Text>
                </View>
                <Text className="text-white text-xl font-bold">
                  Spring Gardening Essentials
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View className="px-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Categories</Text>
            <TouchableOpacity>
              <Text className="text-green-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {categories.map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/Categories/[category]",
                  params: { category: item.category },
                }}
                asChild
              >
                <TouchableOpacity>
                  <View
                    className="mr-4 p-3 rounded-2xl flex-row items-center"
                    style={{
                      backgroundColor: `${item.color}15`, // Using color with 15% opacity
                      borderLeftWidth: 4,
                      borderLeftColor: item.color,
                      width: 200,
                    }}
                  >
                    <View className="bg-white rounded-xl p-2 mr-3 shadow-sm">
                      <Image
                        source={item.image}
                        className="w-12 h-12"
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text className="text-lg font-bold text-gray-800">
                        {item.category}
                      </Text>
                      <Text className="text-sm text-gray-500">10 Plants</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
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
