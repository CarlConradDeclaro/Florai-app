import Input from "@/components/common/Input";
import { PlantCard } from "@/components/PlantCard";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import searchPlants from "@/services/search-plants";

export default function Search() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Monstera",
    "Snake Plant",
    "Bamboo",
  ]);

  const popularCategories = [
    { name: "Indoor", icon: "home" },
    { name: "Outdoor", icon: "tree" },
    { name: "Succulents", icon: "flower" },
    { name: "Herbs", icon: "leaf" },
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        handleSearch(query);
      } else {
        setResults([]); // clear results if query is empty
      }
    }, 500); // debounce input by 500ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async (q) => {
    setIsLoading(true);
    const data = await searchPlants(q);
    if (data) {
      setResults(data);
      // Save to recent searches if not already there
      if (!recentSearches.includes(q) && q.length > 2) {
        setRecentSearches((prev) => [q, ...prev.slice(0, 4)]);
      }
    }
    setIsLoading(false);
  };

  const handleCategoryPress = (category) => {
    setQuery(category);
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <View className="flex-1 w-full bg-[#f8fcf9]">
      <ScrollView className="flex-1">
        <View className="pt-6 pb-4 px-5">
          <Text className="text-2xl font-bold text-green-800 mb-4">
            Discover Plants
          </Text>

          <View className="flex-row gap-3 items-center mb-5">
            <View className="flex-1 flex-row items-center rounded-full bg-white shadow-sm border border-gray-100 h-14">
              <Ionicons name="search" size={20} color="#888" className="ml-4" />
              <Input
                placeholder="Search plants, categories, care tips..."
                value={query}
                onChangeText={setQuery}
                className="flex-1 h-14 ml-2 text-base"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={handleClearSearch} className="mr-3">
                  <View className="bg-gray-200 rounded-full p-1">
                    <Ionicons name="close" size={16} color="#555" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              className="bg-green-600 p-3 rounded-full shadow-md"
              activeOpacity={0.8}
            >
              <Feather name="sliders" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {!query && (
            <>
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                Browse Categories
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
              >
                {popularCategories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCategoryPress(category.name)}
                    className="mr-4"
                  >
                    <View className="bg-white rounded-2xl shadow-sm p-3 border border-gray-100 items-center w-24 h-24 justify-center">
                      <MaterialCommunityIcons
                        name={category.icon}
                        size={36}
                        color="#2F855A"
                      />
                      <Text className="text-center text-sm font-medium mt-2">
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {recentSearches.length > 0 && (
                <View className="mb-6">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-lg font-semibold text-gray-800">
                      Recent Searches
                    </Text>
                    <TouchableOpacity onPress={() => setRecentSearches([])}>
                      <Text className="text-green-600 text-sm">Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row flex-wrap">
                    {recentSearches.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setQuery(item)}
                        className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2"
                      >
                        <Text className="text-gray-700">{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}

          {isLoading && (
            <View className="items-center justify-center py-10">
              <ActivityIndicator size="large" color="#2F855A" />
              <Text className="text-gray-500 mt-2">Finding plants...</Text>
            </View>
          )}

          {results.length > 0 && (
            <View className="mt-2">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                Search Results {results.length > 0 && `(${results.length})`}
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {results.map((plant, index) => (
                  <View key={index} className="w-[48%] mb-4">
                    <PlantCard plant={plant} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {query && results.length === 0 && !isLoading && (
            <View className="items-center justify-center py-10">
              <Feather name="search" size={50} color="#bbbbbb" />
              <Text className="text-gray-500 text-center mt-4">
                No plants found matching "{query}"
              </Text>
              <Text className="text-gray-400 text-center mt-1">
                Try another search term
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
