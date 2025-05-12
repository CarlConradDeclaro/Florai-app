import React from "react";
import { Text, View } from "react-native";

interface DataDisplayProps {
  isProcessing: boolean;
}

export const DataDisplay = ({ isProcessing }: DataDisplayProps) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 12,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#10B981",
          fontSize: 12,
          fontFamily: "monospace",
          marginBottom: 4,
        }}
      >
        PLANT ANALYSIS
      </Text>
      <Text
        style={{
          color: "#10B981",
          fontSize: 12,
          fontFamily: "monospace",
          marginBottom: 4,
        }}
      >
        CENTER TARGET ON SPECIMEN
      </Text>
      <Text
        style={{
          color: "#10B981",
          fontSize: 12,
          fontFamily: "monospace",
          marginBottom: 4,
        }}
      >
        {isProcessing ? "PROCESSING..." : "READY TO SCAN"}
      </Text>
    </View>
  );
};
