import { CapturedImage } from "@/Interface/camera-types";
import React from "react";
import { View, Text, Modal, Image, TouchableOpacity } from "react-native";

interface ImagePreviewModalProps {
  visible: boolean;
  capturedImage: CapturedImage | null;
  classificationResult: any | null;
  onClose: () => void;
}

export const ImagePreviewModal = ({
  visible,
  capturedImage,
  classificationResult,
  onClose,
}: ImagePreviewModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#2d2d2d",
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          {capturedImage && (
            <Image
              source={{ uri: capturedImage.uri }}
              style={{
                width: "100%",
                height: 288, // Equivalent to h-72 in Tailwind (72px * 4 = 288px)
                objectFit: "cover", // This property works similarly to 'object-cover' in Tailwind
              }}
            />
          )}

          {classificationResult ? (
            <View
              style={{
                padding: 20,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#10B981", // Equivalent to text-green-500 in Tailwind
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                Classification Result:
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {classificationResult.flower_name}{" "}
                {classificationResult.confidence}
              </Text>
            </View>
          ) : (
            <View
              style={{
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#10B981", // Equivalent to text-green-500 in Tailwind
                  fontSize: 16,
                }}
              >
                Analyzing image...
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: "#4A4A4A",
              paddingVertical: 12,
              borderRadius: 5,
              marginBottom: 20,
              marginTop: 10,
              width: "50%",
              alignItems: "center",
            }}
            onPress={onClose}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
