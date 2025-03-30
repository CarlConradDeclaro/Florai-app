import React from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PlantCard } from "../components/PlantCard";

export default function Category() {
  const { category } = useLocalSearchParams();

  // Sample dynamic plant data
  const plantCards = [
    { string: 1 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
    { string: 2 },
  ];

  let leftColumn: any = [];
  let rightColumn: any = [];
  let leftHeight = 0;
  let rightHeight = 0;
  let position = 1;

  plantCards.forEach((item) => {
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
      <View className="flex flex-row justify-center gap-2">
        {/* Left Column */}
        <View className="flex flex-col gap-2">
          {leftColumn.map((item: any, index: number) => (
            <PlantCard key={index} w="200" h="200" />
          ))}
        </View>

        {/* Right Column */}
        <View className="flex flex-col gap-2">
          {rightColumn.map((item: any, index: number) => (
            <PlantCard key={index} w="200" h="300" />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
