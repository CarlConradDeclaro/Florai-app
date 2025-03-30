import { Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View className="p-3 flex flex-row justify-between pr-6">
        <View>
          <Text className="text-2xl font-bold">Good day!</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/icons/search.png")}
            className="w-[25px] h-[25px]"
          />
        </View>
      </View>
      <View className="flex flex-row justify-between p-3">
        <View>
          <Text className="font-medium">Categories</Text>
        </View>
        <View>
          <Text className="underline text-green-500">View All</Text>
        </View>
      </View>
      {/* Categories */}
      <View className="flex flex-row flex-wrap gap-5">
        <Link
          href={{
            pathname: "/Categories/[category]",
            params: { category: "Garden" },
          }}
        >
          <View className="flex flex-row  p-3 gap-2 bg-green-40">
            <View className="w-[5px] bg-green-500"></View>
            <View>
              <Image
                source={require("../../assets/images/garden.png")}
                className="w-[80px] h-[80px]"
              />
            </View>
            <View className="flex flex-col justify-center">
              <Text>2 Plants</Text>
              <Text className="text-2xl font-bold">Garden</Text>
            </View>
          </View>
        </Link>

        <Link
          href={{
            pathname: "/Categories/[category]",
            params: { category: "Popular" },
          }}
        >
          <View className="flex  flex-row  p-3 gap-2 bg-green-40">
            <View className="w-[5px] bg-blue-500"></View>
            <View>
              <Image
                source={require("../../assets/images/popular.png")}
                className="w-[80px] h-[80px]"
              />
            </View>
            <View className="flex flex-col justify-center">
              <Text>2 Plants</Text>
              <Text className="text-2xl font-bold">Popular</Text>
            </View>
          </View>
        </Link>

        <Link
          href={{
            pathname: "/Categories/[category]",
            params: { category: "Indoor" },
          }}
        >
          <View className="flex flex-row  p-3 gap-2 bg-green-40">
            <View className="w-[5px] bg-yellow-500"></View>
            <View>
              <Image
                source={require("../../assets/images/indoor.png")}
                className="w-[80px] h-[80px]"
              />
            </View>
            <View className="flex flex-col justify-center">
              <Text>2 Plants</Text>
              <Text className="text-2xl font-bold">Indoor</Text>
            </View>
          </View>
        </Link>

        <Link
          href={{
            pathname: "/Categories/[category]",
            params: { category: "Outdoor" },
          }}
        >
          <View className="flex  flex-row  p-3 gap-2 bg-green-40">
            <View className="w-[5px] bg-purple-500"></View>
            <View>
              <Image
                source={require("../../assets/images/outdoor.png")}
                className="w-[80px] h-[80px]"
              />
            </View>
            <View className="flex flex-col justify-center">
              <Text>2 Plants</Text>
              <Text className="text-2xl font-bold">Outdoor</Text>
            </View>
          </View>
        </Link>
      </View>
      {/* Suggested */}
      <View className="mt-2">
        <View className="flex flex-row justify-between p-3">
          <Text className="font-medium">Suggested</Text>
          <Text className="underline text-green-500">View All</Text>
        </View>
        <View className="flex flex-wrap flex-row p-2 gap-2">
          <View className="relative bg-[#F8F8F8] w-[48%] h-[200px] rounded-3xl p-4">
            <Text className="absolute left-4 top-[100px]   text-green-600 text-sm font-medium">
              Indoor Plant
            </Text>
            <View className="absolute left-4 top-[120px] ">
              <Text className="text-black font-bold text-lg leading-5">
                Monstera
              </Text>
              <Text className="text-black font-bold text-lg leading-5">
                Deliciosa
              </Text>
            </View>
            <View className="absolute right-0 top-[30px]">
              <Image
                source={require("../../assets/images/SuggestedIndoor.png")}
                className="w-[130px] h-[130px]"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="relative bg-[#F8F8F8] w-[48%] h-[200px] rounded-3xl p-4">
            <Text className="absolute left-4 top-[100px]   text-green-600 text-sm font-medium">
              Indoor Plant
            </Text>
            <View className="absolute left-4 top-[120px] ">
              <Text className="text-black font-bold text-lg leading-5">
                Monstera
              </Text>
              <Text className="text-black font-bold text-lg leading-5">
                Deliciosa
              </Text>
            </View>
            <View className="absolute right-0 top-[30px]">
              <Image
                source={require("../../assets/images/suggestedPlant.png")}
                className="w-[130px] h-[130px]"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="relative bg-[#F8F8F8] w-[48%] h-[200px] rounded-3xl p-4">
            <Text className="absolute left-4 top-[100px]   text-green-600 text-sm font-medium">
              Indoor Plant
            </Text>
            <View className="absolute left-4 top-[120px] ">
              <Text className="text-black font-bold text-lg leading-5">
                Monstera
              </Text>
              <Text className="text-black font-bold text-lg leading-5">
                Deliciosa
              </Text>
            </View>
            <View className="absolute right-0 top-[30px]">
              <Image
                source={require("../../assets/images/suggestedGarden.png")}
                className="w-[130px] h-[130px]"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="relative bg-[#F8F8F8] w-[48%] h-[200px] rounded-3xl p-4">
            <Text className="absolute left-4 top-[100px]   text-green-600 text-sm font-medium">
              Indoor Plant
            </Text>
            <View className="absolute left-4 top-[120px] ">
              <Text className="text-black font-bold text-lg leading-5">
                Monstera
              </Text>
              <Text className="text-black font-bold text-lg leading-5">
                Deliciosa
              </Text>
            </View>
            <View className="absolute right-0 top-[30px]">
              <Image
                source={require("../../assets/images/popular.png")}
                className="w-[130px] h-[130px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
