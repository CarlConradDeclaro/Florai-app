import React from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PlantCard } from "../../components/PlantCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useAuth from "@/hooks/useAuth";

export default function Category() {
  const { category } = useLocalSearchParams();

  const { user } = useAuth();
  const plants = useQuery(api.plant.savedPlants.getSavedPlantsByCategory, {
    userId: String(user.user_id),
    category: category.toString(),
  });

  let leftColumn: any = [];
  let rightColumn: any = [];
  let leftHeight = 0;
  let rightHeight = 0;
  let position = 1;

  plants?.forEach((item) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(item);
      leftHeight += position++;
    } else {
      rightColumn.push(item);
      rightHeight += position++;
    }
  });

  return (
    <ScrollView className="w-full mt-5">
      <View className="flex flex-row justify-between  px-2 ">
        {/* Left Column */}
        <View className="flex-1 pr-1">
          {leftColumn.map((item: any, index: number) => (
            <PlantCard
              key={index}
              className="w-[100%] h-[300px]"
              bg="white"
              plant={item}
            />
          ))}
        </View>

        {/* Right Column */}
        <View className="flex-1 pl-1">
          {rightColumn.map((item: any, index: number) => (
            <PlantCard
              key={index}
              className="w-[100%] h-[300px]"
              bg="white"
              plant={item}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
