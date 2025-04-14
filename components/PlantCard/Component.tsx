import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import likeImage from "@/assets/images/like.png";
import likedImage from "@/assets/images/liked.png";
import { Plant } from "@/types/Plant";

export default function PlantCard({
  bg,
  className,
  plant,
}: {
  bg?: string;
  className?: string;
  plant: Plant;
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 10,
        shadowOpacity: 0.2,
        marginBottom: 10,
      }}
      className={`${className}`}
    >
      <View className="flex-1  ">
        <Image
          source={{ uri: plant.url }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View className="p-4">
        <View>
          <Text className="font-bold text-lg">{plant.common_name}</Text>
        </View>
        <View className="flex-row w-full bg-red-400 m-3 ">
          <Text style={{ width: " 80%" }}>
            {plant.description.slice(0, 35)}...
          </Text>

          <Pressable
            onPress={handleLikeToggle}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              source={isLiked ? likedImage : likeImage}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
