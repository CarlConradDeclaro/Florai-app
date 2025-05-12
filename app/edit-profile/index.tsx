import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/common/Button";
import * as ImagePicker from "expo-image-picker";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
export default function EditProfile() {
  const { user } = useAuth();
  const router = useRouter();

  // Initial form data based on user
  const [formData, setFormData] = useState({
    name: user?.username || "Alex Johnson",
    email: user?.email || "alex.johnson@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    location: user?.location || "San Francisco, CA",
    bio:
      user?.bio ||
      "UX Designer & Mobile Developer | Photography enthusiast and coffee lover",
    profileImage: user?.profileImage || "https://i.pravatar.cc/150?img=68",
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: "@alexjdesign",
    twitter: "@alexj_designs",
    linkedin: "alex-johnson-design",
  });

  const [image, setImage] = useState(formData.profileImage);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSocialChange = (platform: any, value: any) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-white">
        {/* Header with gradient background */}
        <View className="bg-green-500 pt-12 pb-8 px-5 rounded-b-3xl shadow-md">
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Edit Profile</Text>
            <View style={{ width: 24 }}></View>
          </View>

          {/* Profile Image Picker */}
          <View className="items-center">
            <View className="relative">
              <Image
                source={{ uri: image }}
                className="w-28 h-28 rounded-full border-4 border-white"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
                onPress={pickImage}
              >
                <Ionicons name="camera" size={20} color="#00cc00" />
              </TouchableOpacity>
            </View>
            <Text className="text-white mt-3 text-sm">Tap to change photo</Text>
          </View>
        </View>

        {/* Form Sections */}
        <View className="px-5 py-6">
          {/* Personal Info Section */}
          <View className="mb-8">
            <Text className="text-gray-500 text-sm mb-4 font-medium">
              PERSONAL INFORMATION
            </Text>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <Text className="text-gray-600 text-xs mb-1">Full Name</Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                className="text-gray-800 text-base py-1"
                placeholder="Enter your full name"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <Text className="text-gray-600 text-xs mb-1">Email Address</Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                className="text-gray-800 text-base py-1"
                keyboardType="email-address"
                placeholder="Enter your email"
                autoCapitalize="none"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <Text className="text-gray-600 text-xs mb-1">Phone Number</Text>
              <TextInput
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                className="text-gray-800 text-base py-1"
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
              />
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-gray-600 text-xs mb-1">Location</Text>
              <TextInput
                value={formData.location}
                onChangeText={(text) => handleChange("location", text)}
                className="text-gray-800 text-base py-1"
                placeholder="City, Country"
              />
            </View>
          </View>

          {/* Bio Section */}
          <View className="mb-8">
            <Text className="text-gray-500 text-sm mb-4 font-medium">
              ABOUT YOU
            </Text>

            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-gray-600 text-xs mb-1">Bio</Text>
              <TextInput
                value={formData.bio}
                onChangeText={(text) => handleChange("bio", text)}
                className="text-gray-800 text-base py-1"
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Social Media Links */}
          <View className="mb-8">
            <Text className="text-gray-500 text-sm mb-4 font-medium">
              SOCIAL MEDIA
            </Text>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <View className="flex-row items-center">
                <Ionicons name="logo-instagram" size={20} color="#E1306C" />
                <TextInput
                  value={socialLinks.instagram}
                  onChangeText={(text) => handleSocialChange("instagram", text)}
                  className="text-gray-800 text-base py-1 ml-2 flex-1"
                  placeholder="Instagram username"
                />
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <View className="flex-row items-center">
                <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
                <TextInput
                  value={socialLinks.twitter}
                  onChangeText={(text) => handleSocialChange("twitter", text)}
                  className="text-gray-800 text-base py-1 ml-2 flex-1"
                  placeholder="Twitter username"
                />
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Ionicons name="logo-linkedin" size={20} color="#0077B5" />
                <TextInput
                  value={socialLinks.linkedin}
                  onChangeText={(text) => handleSocialChange("linkedin", text)}
                  className="text-gray-800 text-base py-1 ml-2 flex-1"
                  placeholder="LinkedIn username"
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="flex-1 bg-gray-200 py-4 rounded-xl mr-2 items-center"
              onPress={() => router.replace("/(tabs)/profile")}
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-green-500 py-4 rounded-xl ml-2 items-center"
              onPress={handleSave}
            >
              <Text className="text-white font-medium">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
