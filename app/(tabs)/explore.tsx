import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { searchCategories } from "@/constants/categories";

export default function ExploreScreen() {
  const [displayOrientation, setDisplayOrientation] = useState("grid");
  const windowWidth = Dimensions.get("window").width;

  // Animation values for selected orientation
  const activeScale = 1.1;
  const inactiveOpacity = 0.5;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View className="flex-1 bg-white">
        {/* Header Bar */}
        <View className="bg-white pt-12 pb-3 px-4 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-3">Explore</Text>

          {/* Search and Filter Bar */}
          <View className="flex-row items-center justify-between">
            <Link href="../Search" asChild className="flex-1 mr-3">
              <TouchableOpacity className="flex-row items-center bg-gray-100 rounded-xl py-3 px-4">
                <Ionicons name="search" size={20} color="#4CAF50" />
                <Text className="text-gray-500 ml-2 flex-1">
                  Find plants and categories...
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity className="bg-green-500 rounded-xl p-3">
              <Ionicons name="options-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* View Toggle */}
          <View className="flex-row justify-end items-center mt-4">
            <TouchableOpacity
              className={`flex-row items-center py-1 px-3 rounded-l-lg ${displayOrientation === "grid" ? "bg-green-100" : "bg-gray-100"}`}
              onPress={() => setDisplayOrientation("grid")}
            >
              <Ionicons
                name="grid-outline"
                size={18}
                color={displayOrientation === "grid" ? "#4CAF50" : "#9E9E9E"}
                style={{
                  transform: [
                    { scale: displayOrientation === "grid" ? activeScale : 1 },
                  ],
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center py-1 px-3 rounded-r-lg ${displayOrientation === "linear" ? "bg-green-100" : "bg-gray-100"}`}
              onPress={() => setDisplayOrientation("linear")}
            >
              <Ionicons
                name="menu-outline"
                size={18}
                color={displayOrientation === "linear" ? "#4CAF50" : "#9E9E9E"}
                style={{
                  transform: [
                    {
                      scale: displayOrientation === "linear" ? activeScale : 1,
                    },
                  ],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Grid/List */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            className={`flex ${displayOrientation === "grid" ? "flex-row flex-wrap justify-between" : "flex-col"}`}
          >
            {searchCategories.map(({ id, name, image }) => (
              <Link
                key={id}
                href={{
                  pathname: "/Categories/[category]",
                  params: { category: name },
                }}
                asChild
              >
                <TouchableOpacity
                  className={`${displayOrientation === "grid" ? "w-[48%] mb-4" : "w-full mb-4"}`}
                  activeOpacity={0.8}
                >
                  <ImageBackground
                    source={image}
                    className={`${displayOrientation === "grid" ? "h-40" : "h-48"} overflow-hidden rounded-xl`}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
                      className="absolute left-0 right-0 bottom-0 top-0"
                    />

                    {displayOrientation === "linear" ? (
                      <View className="flex-1 p-4 justify-end">
                        <Text className="text-white text-2xl font-bold shadow-text mb-1">
                          {name}
                        </Text>
                        <View className="flex-row items-center">
                          <Ionicons
                            name="leaf-outline"
                            size={16}
                            color="#FFFFFF"
                          />
                          <Text className="text-white ml-1 text-sm">
                            24 plants
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View className="flex-1 p-3 justify-center items-center">
                        <Text className="text-white text-xl font-bold text-center shadow-text">
                          {name}
                        </Text>
                      </View>
                    )}

                    {/* Floating Info Button - only in linear view */}
                    {displayOrientation === "linear" && (
                      <TouchableOpacity className="absolute top-3 right-3 bg-white/20 rounded-full p-2 backdrop-blur-md">
                        <Ionicons
                          name="information-circle-outline"
                          size={20}
                          color="white"
                        />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
