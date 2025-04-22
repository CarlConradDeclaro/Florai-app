import React, { useEffect } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import likeImage from "@/assets/images/like.png";
import likedImage from "@/assets/images/liked.png";
import { Plant } from "@/types/Plant";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useAuth from "@/hooks/useAuth";
import { router, useRouter } from "expo-router";

export default function PlantCard({
  bg,
  className,
  plant,
}: {
  bg?: string;
  className?: string;
  plant: Plant;
}) {
  const savePlant = useMutation(api.plant.savedPlants.savePlant);
  const unsavePlant = useMutation(api.plant.savedPlants.unsavePlant); // Import unsavePlant mutation
  const { user } = useAuth();
  const router = useRouter();
  const [isLiked, setIsLiked] = React.useState(false);
  useEffect(() => {
    setIsLiked(plant.saved ? true : false);
  }, []);
  const handleLikeToggle = async () => {
    setIsLiked(!isLiked);

    if (user) {
      if (!isLiked) {
        // If plant is not liked, save it
        await savePlant({
          userId: String(user.user_id),
          plantId: plant._id,
        });
      } else {
        // If plant is already liked, unsave it
        await unsavePlant({
          userId: String(user.user_id),
          plantId: plant._id,
        });
      }
    }
  };

  const handleViewPlantDetail = () => {
    router.push({
      pathname: "/plant-detail/[plant]",
      params: {
        plant: JSON.stringify(plant),
      },
    });
  };
  return (
    <TouchableOpacity
      onPress={handleViewPlantDetail}
      style={{
        backgroundColor: bg || "#ffffff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 16,
        overflow: "hidden",
      }}
      className={`${className}`}
    >
      <View className="relative">
        <Image
          source={{ uri: plant.url }}
          style={{
            width: "100%",
            height: 180,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: bg || "#4CAF50",
            opacity: 0.6,
          }}
        />
      </View>
      <View className="p-4">
        <Text
          className="font-bold text-lg text-gray-800"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {plant.common_name}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <Text
            className="text-gray-600 flex-1 pr-2"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {plant.description.slice(0, 60)}...
          </Text>

          <Pressable
            onPress={handleLikeToggle}
            style={{
              padding: 8,
              backgroundColor: isLiked
                ? "rgba(255, 99, 71, 0.1)"
                : "transparent",
              borderRadius: 20,
            }}
            className="items-center justify-center"
          >
            <Image
              source={isLiked ? likedImage : likeImage}
              style={{
                width: 24,
                height: 24,
                transform: [{ scale: isLiked ? 1.1 : 1 }],
              }}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}
