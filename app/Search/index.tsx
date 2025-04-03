import Input from "@/components/Input";
import { PlantCard } from "@/components/PlantCard";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Search() {
  const [query, setQuery] = React.useState("");
  return (
    <ScrollView className="flex-1 w-full bg-white">
      <View className="flex-row gap-2 items-center pl-5 pr-5 pt-5 ">
        <View className="flex-row items-center gap-2 w-[90%] h-[45px] rounded-2xl  bg-[#EBF6ED]">
          <Input placeholder="Explore" value={query} onChangeText={setQuery}>
            <Image
              source={require("../../assets/images/search.png")}
              className="ml-3  w-[30px] h-[30px]"
            />
          </Input>
        </View>
        <Image
          source={require("../../assets/images/filter.png")}
          className="w-[30px] h-[30px]"
        />
      </View>

      <View className="p-5">
        <Text>Top Searches:</Text>
      </View>

      <ScrollView className="p-5">
        <PlantCard className="w-auto h-[50px] border-b-2" />
        <PlantCard className="w-auto h-[50px] border-b-2" />
        <PlantCard className="w-auto h-[50px] border-b-2" />
      </ScrollView>
    </ScrollView>
  );
}
