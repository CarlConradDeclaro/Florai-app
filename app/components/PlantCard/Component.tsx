import React from "react";
import { Text, View } from "react-native";

export default function PlantCard({ w, h }: { w: string; h: string }) {
  return (
    <View
      style={{
        width: parseInt(w),
        height: parseInt(h),
        backgroundColor: "white",
        borderRadius: 10,
        shadowOpacity: 0.2,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        Plant Card
      </Text>
    </View>
  );
}
