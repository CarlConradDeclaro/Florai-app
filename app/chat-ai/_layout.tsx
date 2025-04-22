import { Stack } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Layout() {
  const { index } = useLocalSearchParams();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[index]"
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
                <Image
                  source={require("@/assets/images/ai-logo.png")}
                  className="w-10 h-10 rounded-full"
                  resizeMode="cover"
                />

                <Text className="text-[10px]">FlorAI</Text>
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
