import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Sample category images - replace these with your actual images
const categoryImages = {
  "All Pins": "https://images.unsplash.com/photo-1466781783364-36c955e42a7f",
  Indoor: "https://images.unsplash.com/photo-1463320726281-696a485928c7",
  Outdoor: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9d",
  Garden: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
};

// Category colors
const categoryColors = {
  "All Pins": ["#4CAF50", "#8BC34A"],
  Indoor: ["#009688", "#4DB6AC"],
  Outdoor: ["#FF9800", "#FFB74D"],
  Garden: ["#673AB7", "#9575CD"],
};

export default function SavedScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const getSaved = useQuery(api.plant.savedPlants.getSavedPlants, {
    userId: String(user.user_id),
  });

  // Extract unique categories from the saved plants data
  const uniqueCategories = Array.from(
    new Set(getSaved?.map((plant) => plant.category))
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View className="pt-12 pb-4 px-5 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Collections</Text>
          <View className="flex-row">
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-2">
              <Ionicons name="search" size={22} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="add" size={22} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Featured Collection */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity className="mb-6">
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1526397751294-331021109fbd",
            }}
            className="h-44 rounded-2xl overflow-hidden"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
              className="absolute left-0 right-0 bottom-0 top-0"
            />
            <View className="flex-1 p-5 justify-end">
              <View className="bg-white/20 self-start px-3 py-1 rounded-full backdrop-blur-sm mb-2">
                <Text className="text-white text-xs font-medium">Featured</Text>
              </View>
              <Text className="text-white text-2xl font-bold mb-1">
                All Collections
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="bookmark" size={16} color="#FFFFFF" />
                <Text className="text-white ml-1">45 saved plants</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Section Title */}
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Your Collections
        </Text>

        {/* Collections Grid */}
        <View className="flex-row flex-wrap justify-between">
          {uniqueCategories.map((category, index) => {
            // Filter plants by category
            const categoryPlants = getSaved?.filter(
              (plant) => plant.category === category
            );

            return (
              <Link
                href={{
                  pathname: "/Favorites/[category]",
                  params: { category },
                }}
                className="w-[48%] mb-4 rounded-xl overflow-hidden"
                key={index}
              >
                <ImageBackground
                  source={{
                    uri: categoryImages[category] || categoryImages["All Pins"],
                  }}
                  className="h-48 w-full"
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={
                      categoryColors[category] || categoryColors["All Pins"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute left-0 right-0 bottom-0 top-0 opacity-80"
                  />
                  <View className="flex-1 p-4 justify-end">
                    <Text className="text-white text-lg font-bold mb-1">
                      {category}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="leaf-outline" size={14} color="#FFFFFF" />
                      <Text className="text-white text-xs ml-1">
                        {categoryPlants?.length} plants
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Link>
            );
          })}
        </View>

        {/* Create New Collection Button */}
        <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center justify-center mt-2">
          <Ionicons name="add-circle-outline" size={22} color="#4CAF50" />
          <Text className="ml-2 text-gray-800 font-medium">
            Create New Collection
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
