import Input from "@/components/Input";
import React from "react";
import { View, Image, Text, ScrollView } from "react-native";

export default function TabTwoScreen() {
  const [text, setText] = React.useState("");

  const searchCategories = [
    {
      name: "Indoor Plants",
      image: require("../../assets/images/IndoorPlant.png"),
    },
    {
      name: "Outdoor Plants",
      image: require("../../assets/images/outdoorPlants.png"),
    },
    {
      name: "Medicine Plants",
      image: require("../../assets/images/medicinePlants.png"),
    },
    {
      name: "Water Plants",
      image: require("../../assets/images/outdoorPlants.png"),
    },
  ];

  return (
    <ScrollView className="flex-1 w-full bg-white">
      <View className="flex-row gap-2 items-center pl-5 pr-5 pt-5">
        <Input
          placeholder="Explore"
          value={text}
          onChangeText={setText}
          className="w-[80%] h-[50px]"
        >
          <Image
            source={require("../../assets/images/search.png")}
            className="ml-3  w-[30px] h-[30px]"
          />
        </Input>
        <Image
          source={require("../../assets/images/filter.png")}
          className="w-[30px] h-[30px]"
        />
      </View>

      <View className="flex-row gap-2 ml-auto mt-2 p-5 items-center">
        <Image
          source={require("../../assets/images/grid.png")}
          className="w-[30px] h-[30px]"
        />
        <Image
          source={require("../../assets/images/linear.png")}
          className="w-[30px] h-[35px]"
        />
      </View>

      <View className="flex-col items-center relative gap-3 mb-5">
        {searchCategories.map(({ name, image }) => (
          <View key={name}>
            <Image source={image} />
            <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -traslate-y-1/2 font-bold color-white text-[25px]">
              {name}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
