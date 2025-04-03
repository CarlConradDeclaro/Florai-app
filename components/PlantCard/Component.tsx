import React from "react";
import { Text, View } from "react-native";

export default function PlantCard({
  bg,
  className,
}: {
  bg?: string;
  className?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 10,
        shadowOpacity: 0.2,
        padding: 10,
        marginBottom: 10,
      }}
      className={`${className}`}
    >
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        Plant Card
      </Text>
    </View>
  );
}
