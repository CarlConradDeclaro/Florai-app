import { categories, suggestedPlants } from "@/constants/categories";
import { Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-3 flex flex-row justify-between pr-6 ">
        <View>
          <Text className="text-2xl font-bold">Good day!</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/icons/search.png")}
            className="w-[25px] h-[25px] "
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
      <View className="flex flex-row flex-wrap justify-between ">
        {categories.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: "/Categories/[category]",
              params: { category: item.category },
            }}
          >
            <View className="w-[48%] flex flex-row p-3 gap-2  rounded-lg mb-3">
              <View style={{ width: 5, backgroundColor: item.color }}></View>
              <View>
                <Image source={item.image} className="w-[80px] h-[80px]" />
              </View>
              <View className="flex flex-col justify-center">
                <Text className="text-sm text-gray-600">2 Plants</Text>
                <Text className="text-lg font-bold">{item.category}</Text>
              </View>
            </View>
          </Link>
        ))}
      </View>

      {/* Suggested */}
      <View className="mt-2">
        <View className="flex flex-row justify-between p-3">
          <Text className="font-medium">Suggested</Text>
          <Text className="underline text-green-500">View All</Text>
        </View>
        <View className="flex flex-wrap flex-row justify-between p-2 gap-2">
          {suggestedPlants.map((plant, index) => (
            <View
              key={index}
              className="relative bg-[#F8F8F8] w-[48%] h-[200px] rounded-3xl p-4"
            >
              <Text className="absolute left-4 top-[100px] text-green-600 text-sm font-medium">
                {plant.type}
              </Text>
              <View className="absolute left-4 top-[120px]">
                <Text className="text-black font-bold text-lg leading-5">
                  {plant.name[0]}
                </Text>
                <Text className="text-black font-bold text-lg leading-5">
                  {plant.name[1]}
                </Text>
              </View>
              <View className="absolute right-0 top-[30px]">
                <Image
                  source={plant.image}
                  className="w-[130px] h-[130px]"
                  resizeMode="contain"
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
