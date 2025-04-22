import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function PlantDetail() {
  const { plant } = useLocalSearchParams();
  const plantDetail = JSON.parse(plant);
  const router = useRouter();
  const plantFeatures = [
    {
      icon: "water-outline",
      label: "Water",
      value: plantDetail.wateringNeeds,
      color: "#3B82F6",
    },
    {
      icon: "sunny-outline",
      label: "Light",
      value: plantDetail.sunlight,
      color: "#F59E0B",
    },
    {
      icon: "water-percent",
      label: "Humidity",
      value: plantDetail.humidityPreference,
      color: "#10B981",
    },
    {
      icon: "leaf",
      label: "Type",
      value: plantDetail.plant_Type,
      color: "#8B5CF6",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <StatusBar style="light" />

      {/* Header Image Section */}
      <View className="relative">
        <Image
          source={{ uri: plantDetail.url }}
          className="w-full h-72 rounded-b-3xl"
          style={{ backgroundColor: "#E8F6EF" }}
          resizeMode="contain"
        />

        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-10 left-4 bg-white/70 p-2 rounded-full"
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#2F855A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Plant Name Section */}
        <View className="px-6 pt-5">
          <Text className="text-3xl font-bold text-gray-800">
            {plantDetail.common_name}
          </Text>
          <Text className="text-gray-500 italic mt-1">
            {plantDetail.scientific_name}
          </Text>
        </View>

        {/* Tags Section */}
        <View className="flex-row flex-wrap gap-2 px-6 py-4">
          <View className="bg-green-100 px-4 py-1 rounded-full">
            <Text className="text-green-700 font-medium">
              {plantDetail.category}
            </Text>
          </View>
          <View className="bg-green-100 px-4 py-1 rounded-full">
            <Text className="text-green-700 font-medium">
              {plantDetail.life_span}
            </Text>
          </View>
          {plantDetail.medicinalUses && plantDetail.medicinalUses !== "No" && (
            <View className="bg-green-100 px-4 py-1 rounded-full">
              <Text className="text-green-700 font-medium">Medicinal</Text>
            </View>
          )}
          {plantDetail.culinaryUse && (
            <View className="bg-green-100 px-4 py-1 rounded-full">
              <Text className="text-green-700 font-medium">
                {plantDetail.culinaryUse}
              </Text>
            </View>
          )}
        </View>

        {/* Care Info Cards */}
        <View className="px-6 py-2">
          <Text className="text-xl font-semibold text-gray-800 mb-3">
            Plant Care
          </Text>
          <View className="flex-row justify-between">
            {plantFeatures.map((feature, index) => (
              <View
                key={index}
                className="bg-gray-50 rounded-2xl w-[22%] p-3 items-center shadow-sm border border-gray-100"
              >
                {feature.icon === "water-percent" ? (
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={24}
                    color={feature.color}
                  />
                ) : (
                  <Ionicons
                    name={feature.icon}
                    size={24}
                    color={feature.color}
                  />
                )}
                <Text className="text-xs text-gray-500 mt-1">
                  {feature.label}
                </Text>
                <Text className="text-xs font-medium mt-1">
                  {feature.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description Section */}
        <View className="px-6 py-4">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            About
          </Text>
          <Text className="text-gray-700 leading-6">
            {plantDetail.description}
          </Text>
        </View>

        {/* Additional Info Section */}
        <View className="bg-green-50 mx-6 my-4 p-5 rounded-2xl">
          <View className="flex-row items-center mb-2">
            <Feather name="info" size={20} color="#2F855A" />
            <Text className="text-green-800 font-semibold text-lg ml-2">
              Care Tips
            </Text>
          </View>
          <Text className="text-gray-700 leading-6">
            {plantDetail.plant_Type === "Succulent"
              ? "This succulent thrives with minimal water. Allow soil to dry completely between waterings and provide bright, indirect light. Protect from frost and cold temperatures."
              : "Ensure proper light conditions and consistent watering schedule. Monitor for pests regularly and consider fertilizing during the growing season for optimal health."}
          </Text>
        </View>

        {/* Bottom space for scroll */}
        <View className="h-20" />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="flex-row px-6 py-4 border-t border-gray-200">
        <TouchableOpacity
          className="flex-1 bg-green-600 rounded-full py-3"
          activeOpacity={0.7}
        >
          <View className="flex-row justify-center items-center">
            <Ionicons name="bookmark-sharp" size={24} color="white" />
            <Text className="text-white font-medium ml-2">Save this Plant</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* AI Chat Button - Fixed at bottom right */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 bg-white shadow-lg p-2 rounded-full"
        activeOpacity={0.8}
        // onPress={() => router.push("/chatbot")}
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          zIndex: 10,
        }}
      >
        <View className="    ">
          <Image
            source={require("@/assets/images/ai-logo.png")}
            className="w-[50px] h-[50px] rounded-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
