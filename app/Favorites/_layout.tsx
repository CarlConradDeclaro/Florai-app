import { Stack } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Layout() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[category]"
        options={{
          header: () => (
            <View className="flex-row items-center justify-between bg-white h-16 px-4 shadow-md">
              {/* Custom Back Button */}
              <TouchableOpacity onPress={() => router.back()} className="w-6">
                <Image
                  source={require("../../assets/icons/back.png")}
                  className="w-8 h-8"
                />
              </TouchableOpacity>

              {/* Centered Title */}
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold">
                  {category ? String(category) : "Category"}
                </Text>
              </View>

              {/* Invisible Placeholder for Spacing */}
              <View className="w-6" />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
