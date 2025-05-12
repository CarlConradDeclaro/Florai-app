import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { GridLines } from "./GridLines";
import { ScanningLine } from "./ScanningLine";
import { DataDisplay } from "./DataDisplay";

interface CameraOverlayProps {
  scanLineY: any;
  isScanning: boolean;
  isProcessing: boolean;
  onCapture: () => Promise<void>;
  onFlipCamera: () => void;
  onPickImage: () => Promise<void>;
}

export const CameraOverlay = ({
  scanLineY,
  isScanning,
  isProcessing,
  onCapture,
  onFlipCamera,
  onPickImage,
}: CameraOverlayProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "relative",
      }}
    >
      {/* Non-interactive Components */}
      <GridLines />
      <ScanningLine scanLineY={scanLineY} isScanning={isScanning} />
      <DataDisplay isProcessing={isProcessing} />

      {/* Buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 12,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          zIndex: 10, // Make sure buttons are on top
          pointerEvents: "auto", // Ensure buttons receive touch events
        }}
      >
        {/* Flip Camera Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: 50,
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
          onPress={onFlipCamera}
          disabled={isProcessing}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Flip
          </Text>
        </TouchableOpacity>

        {/* Capture Button */}
        <TouchableOpacity
          style={{
            borderRadius: 50,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: isProcessing
              ? "rgba(169, 169, 169, 0.7)"
              : "rgba(0, 128, 0, 0.7)",
          }}
          onPress={onCapture}
          disabled={isProcessing}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {isProcessing ? "Processing..." : "Capture"}
          </Text>
        </TouchableOpacity>

        {/* Upload Image Button */}
        <TouchableOpacity
          style={{
            borderRadius: 50,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: isProcessing
              ? "rgba(169, 169, 169, 0.7)"
              : "rgba(0, 128, 0, 0.7)",
          }}
          onPress={onPickImage}
          disabled={isProcessing}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {isProcessing ? "Processing..." : "Upload"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
