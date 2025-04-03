import Input from "@/components/Input";
import { searchCategories } from "@/constants/categories";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";

export default function TabTwoScreen() {
  const [displayOrientation, setDisplayOrientation] = React.useState("linear");

  return (
    <ScrollView className="flex-1 w-full bg-white">
      <View className="flex-row gap-2 items-center pl-5 pr-5 pt-5">
        <View className="flex-row justify-center items-center w-full">
          <Link href="../search">
            <View className="flex-row items-center  gap-2 w-[95%] h-[45px] rounded-2xl  bg-[#EBF6ED] p-2">
              <Image
                source={require("../../assets/images/search.png")}
                className=" w-[30px] h-[30px]"
              />
              <Text className="text-gray-500 ">Explore</Text>
            </View>
          </Link>
          <Image
            source={require("../../assets/images/filter.png")}
            className="w-[30px] h-[30px]"
          />
        </View>
      </View>

      <View className="flex-row gap-2 ml-auto mt-2 p-5 items-center">
        <TouchableOpacity onPress={() => setDisplayOrientation("grid")}>
          <Image
            source={require("../../assets/images/grid.png")}
            style={[
              {
                width: 30,
                height: 25,
                opacity: displayOrientation === "grid" ? 1 : 0.5,
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDisplayOrientation("linear")}>
          <Image
            source={require("../../assets/images/linear.png")}
            style={[
              {
                width: 30,
                height: 35,
                opacity: displayOrientation === "linear" ? 1 : 0.5,
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View
        className={`${
          displayOrientation == "grid"
            ? "flex-row flex-wrap  justify-center"
            : "flex-col"
        }  items-center relative gap-3 mb-5`}
      >
        {searchCategories.map(({ id, name, image }) => (
          <Link
            key={id}
            href={{
              pathname: "/Categories/[category]",
              params: { category: name },
            }}
          >
            <View key={id}>
              <Image
                source={image}
                className={`${
                  displayOrientation == "grid" ? "w-[22vh] rounded-lg" : ""
                }`}
              />
              <Text
                className={`absolute  ${
                  displayOrientation == "grid"
                    ? "top-20 left-8 text-[18px]"
                    : "top-1/2 left-1/2 -translate-x-1/2 -traslate-y-1/2 text-[25px]"
                }  font-bold color-white  `}
              >
                {name}
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
