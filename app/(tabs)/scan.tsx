import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { CameraInstance, CapturedImage } from "@/Interface/CampturedImage";

export default function App() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(
    null
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const cameraRef = useRef<CameraInstance | null>(null);

  const scanLineY = useState(new Animated.Value(150))[0];

  const startScan = () => {
    setScanning(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineY, {
          toValue: 650,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineY, {
          toValue: 150,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startScan();
  });

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo);

        setShowImageModal(true);
        setScanning(false);
        setTimeout(() => {
          setScanning(true);
        }, 200);
        router.push({
          pathname: "../ScannedPlants",
          params: { uri: photo.uri },
        });
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef as any} style={styles.camera} facing={facing}>
        {/* Scanner overlay */}
        <View style={styles.overlay}>
          {/* Grid lines */}
          <View style={styles.gridContainer}>
            <View style={[styles.gridLine, styles.horizontalLine]} />
            <View
              style={[styles.gridLine, styles.horizontalLine, { top: "66%" }]}
            />
            <View style={[styles.gridLine, styles.verticalLine]} />
            <View
              style={[styles.gridLine, styles.verticalLine, { left: "66%" }]}
            />
          </View>

          {/* Scanning line */}
          {scanning && (
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineY }] },
              ]}
            />
          )}

          {/* Data display */}
          <View style={styles.dataDisplay}>
            <Text style={styles.dataText}>PLANT ANALYSIS</Text>
            <Text style={styles.dataText}>CENTER TARGET ON SPECIMEN</Text>
            <Text style={styles.dataText}>PROCESSING...</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.scanButton]}
              onPress={captureImage}
            >
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  gridContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: "absolute",
    backgroundColor: "rgba(74, 255, 113, 0.3)",
  },
  horizontalLine: {
    top: "33%",
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    left: "33%",
    width: 1,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#4AFF71",
    opacity: 0.8,
  },
  dataDisplay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  dataText: {
    color: "#4AFF71",
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: "center",
  },
  scanButton: {
    backgroundColor: "rgba(74, 255, 113, 0.3)",
    borderWidth: 1,
    borderColor: "#4AFF71",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4AFF71",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4AFF71",
    marginBottom: 15,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4AFF71",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#444",
  },
  saveButton: {
    backgroundColor: "rgba(74, 255, 113, 0.3)",
    borderWidth: 1,
    borderColor: "#4AFF71",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
