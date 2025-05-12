import React from "react";
import { View, Text, Image } from "react-native";

export const GridLines = () => {
  return (
    <View style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Horizontal lines */}
      <View
        style={{
          position: "absolute",
          top: "33%",
          width: "100%",
          height: 1,
          backgroundColor: "white",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "66%",
          width: "100%",
          height: 1,
          backgroundColor: "white",
        }}
      />

      {/* Vertical lines */}
      <View
        style={{
          position: "absolute",
          left: "33%",
          height: "100%",
          width: 1,
          backgroundColor: "white",
        }}
      />
      <View
        style={{
          position: "absolute",
          left: "66%",
          height: "100%",
          width: 1,
          backgroundColor: "white",
        }}
      />
    </View>
  );
};

export const ScanningLine = ({
  scanLineY,
  isScanning,
}: {
  scanLineY: any;
  isScanning: boolean;
}) => {
  if (!isScanning) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: scanLineY,
        width: "100%",
        height: 1,
        backgroundColor: "green",
        pointerEvents: "none", // Ensure the scanning line doesn't capture touch events
      }}
    />
  );
};
