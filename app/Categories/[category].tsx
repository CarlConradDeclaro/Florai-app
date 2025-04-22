import React from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PlantCard } from "../../components/PlantCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plant } from "@/types/Plant";
import useAuth from "@/hooks/useAuth";

export default function Category() {
  const { category } = useLocalSearchParams();
  const categoryName = typeof category === "string" ? category : "Plants";
  const { user } = useAuth();
  const getPlantByCategory = useQuery(
    api.plant.getPlantByCategory.getPlantByCategory,
    {
      category: category.toString(),
      userId: String(user.user_id),
    }
  );

  // Keep the original logic for column distribution
  let leftColumn: any = [];
  let rightColumn: any = [];
  let leftHeight = 0;
  let rightHeight = 0;
  let position = 1;

  getPlantByCategory?.forEach((item) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(item);
      leftHeight += position++;
    } else {
      rightColumn.push(item);
      rightHeight += position++;
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Header */}
        <View className="px-4 py-3 mb-2">
          <Text className="text-2xl font-bold text-gray-800 capitalize">
            {categoryName}
          </Text>
          <Text className="text-gray-500">
            {getPlantByCategory
              ? `${getPlantByCategory.length} plants`
              : "Loading plants..."}
          </Text>
        </View>

        {/* Loading State */}
        {!getPlantByCategory && (
          <View className="flex-1 justify-center items-center py-12">
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text className="text-gray-500 mt-4">Loading plants...</Text>
          </View>
        )}

        {/* Empty State */}
        {getPlantByCategory && getPlantByCategory.length === 0 && (
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500 text-center px-4">
              No plants found in this category. Try another category.
            </Text>
          </View>
        )}

        {/* Plants Grid */}
        {getPlantByCategory && getPlantByCategory.length > 0 && (
          <View className="flex flex-row justify-between px-3">
            {/* Left Column */}
            <View className="flex-1 pr-1.5">
              {leftColumn.map((item: Plant, index: number) => (
                <PlantCard
                  key={`left-${index}`}
                  className="w-full h-80"
                  bg="white"
                  plant={item}
                />
              ))}
            </View>

            {/* Right Column */}
            <View className="flex-1 pl-1.5">
              {rightColumn.map((item: Plant, index: number) => (
                <PlantCard
                  key={`right-${index}`}
                  className="w-full h-80"
                  bg="white"
                  plant={item}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
