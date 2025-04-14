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
          <Link href="../Search">
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

      <View className="flex-row gap-2 ml-auto mt-2 pr-3 pb-3 items-center">
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
        className={`flex ${displayOrientation == "grid" ? "flex-row flex-wrap" : ""} p-1 gap-1 justify-center`}
      >
        {searchCategories.map(({ id, name, image }) => (
          <View
            className={`${displayOrientation == "grid" ? "w-[48%]" : "w-[100%] "}`}
            key={id}
          >
            <Link
              href={{
                pathname: "/Categories/[category]",
                params: { category: name },
              }}
            >
              <View key={id} className="w-full p-1">
                <Image
                  style={{
                    display: "flex",
                    height: 180,
                    width: "100%",
                    borderRadius: 10,
                  }}
                  source={image}
                  resizeMode="cover"
                />
                <Text
                  className={`absolute  ${
                    displayOrientation == "grid"
                      ? "top-1/2 left-14 text-[18px]"
                      : "top-1/2 left-1/2 -translate-x-1/2 -traslate-y-1/2 text-[25px]"
                  }  font-bold color-white  `}
                >
                  {name}
                </Text>
              </View>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
