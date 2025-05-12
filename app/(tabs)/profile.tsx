import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/common/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
export default function Profile() {
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  // Mock user data - replace with actual user data from your auth context
  const userData = {
    name: "Carl Conrad",
    email: "conrad@xcon.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Mobile Developer | coffee lover",
    joinDate: "April 2025",
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Edit Profile",
      description: "Change your profile information",
      action: () => router.replace("/edit-profile"),
    },
    {
      icon: "shield-checkmark-outline",
      title: "Privacy",
      description: "Manage your privacy settings",
      action: () => console.log("Privacy pressed"),
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      description: "Configure notification preferences",
      toggle: true,
      value: notifications,
      onToggle: () => setNotifications(!notifications),
    },
    {
      icon: "moon-outline",
      title: "Dark Mode",
      description: "Switch between light and dark theme",
      toggle: true,
      value: darkMode,
      onToggle: () => setDarkMode(!darkMode),
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      description: "Get assistance or contact support",
      action: () => console.log("Help pressed"),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header with gradient background */}
      <View className="bg-green-500 pt-12 pb-8 px-5 rounded-b-3xl shadow-md h-[200px]">
        <View className="flex-row items-center">
          <View className="mr-4">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=68" }}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </View>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              {userData.name}
            </Text>
            <Text className="text-green-100">{userData.email}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={14} color="#E0F2F1" />
              <Text className="text-green-100 text-xs ml-1">
                {userData.location}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-white/20 p-2 rounded-full"
            onPress={() => router.replace("/edit-profile")}
          >
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats bar */}
        {/* <View className="flex-row justify-between mt-6 bg-white/20 rounded-xl p-3">
          <View className="items-center flex-1">
            <Text className="text-white font-bold text-lg">245</Text>
            <Text className="text-green-100 text-xs">Posts</Text>
          </View>
          <View className="h-full w-px bg-white/30" />
          <View className="items-center flex-1">
            <Text className="text-white font-bold text-lg">15.3K</Text>
            <Text className="text-green-100 text-xs">Followers</Text>
          </View>
          <View className="h-full w-px bg-white/30" />
          <View className="items-center flex-1">
            <Text className="text-white font-bold text-lg">342</Text>
            <Text className="text-green-100 text-xs">Following</Text>
          </View>
        </View> */}
      </View>

      {/* Bio section */}
      <View className="bg-white px-5 py-4 mb-2">
        {/* <Text className="text-gray-800 mb-2">{userData.bio}</Text> */}
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#9E9E9E" />
          <Text className="text-gray-500 text-xs ml-1">
            Joined {userData.joinDate}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className="bg-gray-50 rounded-t-3xl pt-6 pb-8 px-5">
        <Text className="text-gray-500 text-sm mb-4 px-2">SETTINGS</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center bg-white mb-3 p-4 rounded-xl shadow-sm"
            onPress={item.action}
            disabled={item.toggle}
          >
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
              <Ionicons name={item.icon} size={20} color="#00cc00" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-medium">{item.title}</Text>
              <Text className="text-gray-500 text-xs">{item.description}</Text>
            </View>
            {item.toggle ? (
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                thumbColor={item.value ? "#00cc00" : "#F5F5F5"}
              />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
            )}
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center bg-white mt-4 p-4 rounded-xl shadow-sm"
          onPress={logout}
        >
          <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="log-out-outline" size={20} color="#FF5252" />
          </View>
          <View className="flex-1">
            <Text className="text-red-500 font-medium">Logout</Text>
            <Text className="text-gray-500 text-xs">
              Sign out from your account
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
