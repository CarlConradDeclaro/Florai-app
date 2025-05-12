import React from "react";
import { Animated } from "react-native";

interface ScanningLineProps {
  scanLineY: Animated.Value;
  isScanning: boolean;
}

export const ScanningLine = ({ scanLineY, isScanning }: ScanningLineProps) => {
  if (!isScanning) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: "100%",
        height: 1, // equivalent to 'h-0.5' from Tailwind (0.5px height)
        backgroundColor: "rgba(34, 197, 94, 1)", // equivalent to 'bg-green-500' from Tailwind
        transform: [{ translateY: scanLineY }],
      }}
    />
  );
};
