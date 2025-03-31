import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const localIcons: Record<string, any> = {
  home: require("../../assets/icons/home.png"),
  explore: require("../../assets/icons/explore.png"),
  scan: require("../../assets/icons/scan.png"),
  saved: require("../../assets/icons/saved.png"),
  profile: require("../../assets/icons/profile.png"),
};

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {
              marginBottom: 15,
              paddingTop: 5,
              width: "90%",
              alignSelf: "center",
              borderRadius: 20,
              height: 65,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => <TabIcon imagePath="home" />,
            tabBarLabel: ({ focused }) => (
              <Text
                className={
                  focused ? "text-green-500 font-bold " : "text-gray-400  "
                }
              >
                Home
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <TabIcon imagePath="explore" />,
            tabBarLabel: ({ focused }) => (
              <Text
                className={
                  focused ? "text-green-500 font-bold" : "text-gray-400"
                }
              >
                Explore
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="scan"
          options={{
            title: "scan",
            tabBarIcon: ({ color }) => <TabIcon imagePath="scan" />,
            tabBarLabel: ({ focused }) => (
              <Text
                className={
                  focused ? "text-green-500 font-bold" : "text-gray-500"
                }
              >
                Scan
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "saved",
            tabBarIcon: ({ color }) => <TabIcon imagePath="saved" />,
            tabBarLabel: ({ focused }) => (
              <Text
                className={
                  focused ? "text-green-500 font-bold" : "text-gray-500"
                }
              >
                Saved
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            tabBarIcon: ({ color }) => <TabIcon imagePath="profile" />,
            tabBarLabel: ({ focused }) => (
              <Text
                className={
                  focused ? "text-green-500 font-bold" : "text-gray-500"
                }
              >
                Profile
              </Text>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const TabIcon = ({ imagePath }: { imagePath: string }) => {
  const isRemote = imagePath.startsWith("http"); // Detect if it's a URL

  return (
    <Image
      source={
        isRemote ? { uri: imagePath } : localIcons[imagePath] || localIcons.home
      } // Default to home.png if not found
      style={{
        width: 24,
        height: 24,
      }}
      resizeMode="contain"
    />
  );
};
