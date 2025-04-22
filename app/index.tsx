"use client";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token"); // more secure than localStorage
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    };

    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
