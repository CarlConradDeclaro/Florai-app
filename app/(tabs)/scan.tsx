import { View, Text, Button, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { CameraInstance, CapturedImage } from "@/Interface/camera-types";
import { useScanAnimation } from "@/hooks/useScanAnimation";
import { classifyImage } from "@/services/image-service";
import { pickImageFromGallery } from "@/utils/camera-utils";
import { CameraOverlay } from "@/components/Camera/CameraOverlay";
import { ImagePreviewModal } from "@/components/ImageModal";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused

import React, { useState, useRef, useEffect, useCallback } from "react";

export default function App() {
  const router = useRouter();
  const [screenKey, setScreenKey] = useState(0); // Add a key state
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(
    null
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraInstance | null>(null);

  const { scanLineY, startScan, stopScan } = useScanAnimation(scanning);

  // 🔥 Use useIsFocused to determine if the screen is focused
  const isFocused = useIsFocused();

  // 🔥 When screen is focused or unfocused
  useFocusEffect(
    useCallback(() => {
      console.log("Camera screen focused");
      return () => {
        console.log("Camera screen unfocused");
        setScreenKey((prev) => prev + 1); // 🔥 FORCE REMOUNT
      };
    }, [])
  );

  useEffect(() => {
    setScanning(true);
    return () => {
      stopScan();
    };
  }, []);

  useEffect(() => {
    if (scanning) {
      startScan();
    } else {
      stopScan();
    }
  }, [scanning, startScan, stopScan]);

  const captureImage = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        setIsProcessing(true);
        console.log("Capturing image...");

        const photo = await cameraRef.current.takePictureAsync();
        console.log("Image captured:", photo.uri);

        setCapturedImage(photo);
        setShowImageModal(true);
        setScanning(false);

        const classification = await classifyImage(photo.uri);

        if (classification) {
          setClassificationResult(classification);
          navigateToResultScreen(photo.uri, JSON.stringify(classification));
        }

        setIsProcessing(false);
      } catch (error) {
        console.error("Failed to take picture:", error);
        Alert.alert("Error", "Failed to capture image");
        setIsProcessing(false);
      }
    } else if (isProcessing) {
      console.log("Already processing an image, please wait");
    }
  };

  const handlePickImage = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const selectedImage = await pickImageFromGallery();

      if (selectedImage) {
        setCapturedImage(selectedImage);
        setShowImageModal(true);
        setScanning(false);

        const classification = await classifyImage(selectedImage.uri);
        if (classification) {
          setClassificationResult(classification);
          navigateToResultScreen(
            selectedImage.uri,
            JSON.stringify(classification)
          );
        }
      }

      setIsProcessing(false);
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
      setIsProcessing(false);
    }
  };

  const navigateToResultScreen = (uri: string, classification: any) => {
    router.push({
      pathname: "../ScannedPlants",
      params: {
        uri: uri,
        classification: classification,
      },
    });
  };

  const closeModal = () => {
    setShowImageModal(false);
    setScanning(true);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-center mx-5 mb-5">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  // 🔥 The screenKey is used here
  if (!isFocused) {
    return null; // 🔥 UNMOUNT SCREEN if not focused
  }

  return (
    <View style={{ flex: 1 }} key={screenKey}>
      <CameraView ref={cameraRef as any} style={{ flex: 1 }} facing={facing}>
        <CameraOverlay
          scanLineY={scanLineY}
          isScanning={scanning}
          isProcessing={isProcessing}
          onCapture={captureImage}
          onFlipCamera={toggleCameraFacing}
          onPickImage={handlePickImage}
        />
      </CameraView>

      <ImagePreviewModal
        visible={showImageModal}
        capturedImage={capturedImage}
        classificationResult={classificationResult}
        onClose={closeModal}
      />
    </View>
  );
}

// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import * as ImagePicker from "expo-image-picker"; // <- NEW
// import { useEffect, useState, useRef } from "react";
// import {
//   Button,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Animated,
//   Image,
//   Modal,
//   Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import { CameraInstance, CapturedImage } from "@/Interface/CampturedImage";

// export default function App() {
//   const router = useRouter();
//   const [facing, setFacing] = useState<CameraType>("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanning, setScanning] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(
//     null
//   );
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [classificationResult, setClassificationResult] = useState<
//     string | null
//   >(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const cameraRef = useRef<CameraInstance | null>(null);

//   const scanLineY = useState(new Animated.Value(150))[0];
//   const scanAnimation = useRef<Animated.CompositeAnimation | null>(null);

//   const startScan = () => {
//     if (!scanning) return;

//     scanAnimation.current = Animated.loop(
//       Animated.sequence([
//         Animated.timing(scanLineY, {
//           toValue: 650,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scanLineY, {
//           toValue: 150,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ])
//     );

//     scanAnimation.current.start();
//   };

//   const stopScan = () => {
//     if (scanAnimation.current) {
//       scanAnimation.current.stop();
//     }
//   };

//   useEffect(() => {
//     setScanning(true);
//     return () => {
//       stopScan();
//     };
//   }, []);

//   useEffect(() => {
//     if (scanning) {
//       startScan();
//     } else {
//       stopScan();
//     }
//   }, [scanning]);

//   const captureImage = async () => {
//     if (cameraRef.current && !isProcessing) {
//       try {
//         setIsProcessing(true);
//         console.log("Capturing image...");

//         const photo = await cameraRef.current.takePictureAsync();
//         console.log("Image captured:", photo.uri);

//         setCapturedImage(photo);
//         setShowImageModal(true);
//         setScanning(false);

//         await sendImageToBackend(photo.uri);

//         setIsProcessing(false);
//       } catch (error) {
//         console.error("Failed to take picture:", error);
//         Alert.alert("Error", "Failed to capture image");
//         setIsProcessing(false);
//       }
//     } else if (isProcessing) {
//       console.log("Already processing an image, please wait");
//     }
//   };

//   // NEW: Pick image from device gallery
//   const pickImageFromGallery = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//       });

//       if (!result.canceled && result.assets.length > 0) {
//         const imageAsset = result.assets[0];
//         console.log("Selected image from gallery:", imageAsset.uri);

//         const fakeCapturedImage: CapturedImage = {
//           uri: imageAsset.uri,
//           width: imageAsset.width || 0,
//           height: imageAsset.height || 0,
//         };

//         setCapturedImage(fakeCapturedImage);
//         setShowImageModal(true);
//         setScanning(false);

//         await sendImageToBackend(imageAsset.uri);
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const sendImageToBackend = async (uri: string) => {
//     console.log("Preparing to send image to backend...");
//     console.log("Image URI to send:", uri);

//     const formData = new FormData();
//     // @ts-ignore
//     formData.append("image", {
//       uri,
//       type: "image/jpeg",
//       name: "image.jpg",
//     });

//     try {
//       console.log("Sending request to classify endpoint...");

//       const response = await axios.post(
//         "http://192.168.0.246:8000/classify/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Classification response received:", response.data);

//       setClassificationResult(response.data.classification);

//       router.push({
//         pathname: "../ScannedPlants",
//         params: {
//           uri: uri,
//           classification: response.data.classification,
//         },
//       });

//       return response.data.classification;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Axios Error:", error.message);
//         console.error("Status:", error.response?.status);
//         console.error("Response data:", error.response?.data);
//       } else {
//         console.error("Unknown error uploading image:", error);
//       }
//       Alert.alert(
//         "Classification Failed",
//         "Could not classify the image. Please try again."
//       );
//     }
//   };

//   const closeModal = () => {
//     setShowImageModal(false);
//     setScanning(true);
//   };

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView ref={cameraRef as any} style={styles.camera} facing={facing}>
//         {/* Scanner overlay */}
//         <View style={styles.overlay}>
//           {/* Grid lines */}
//           <View style={styles.gridContainer}>
//             <View style={[styles.gridLine, styles.horizontalLine]} />
//             <View
//               style={[styles.gridLine, styles.horizontalLine, { top: "66%" }]}
//             />
//             <View style={[styles.gridLine, styles.verticalLine]} />
//             <View
//               style={[styles.gridLine, styles.verticalLine, { left: "66%" }]}
//             />
//           </View>

//           {/* Scanning line */}
//           {scanning && (
//             <Animated.View
//               style={[
//                 styles.scanLine,
//                 { transform: [{ translateY: scanLineY }] },
//               ]}
//             />
//           )}

//           {/* Data display */}
//           <View style={styles.dataDisplay}>
//             <Text style={styles.dataText}>PLANT ANALYSIS</Text>
//             <Text style={styles.dataText}>CENTER TARGET ON SPECIMEN</Text>
//             <Text style={styles.dataText}>
//               {isProcessing ? "PROCESSING..." : "READY TO SCAN"}
//             </Text>
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={toggleCameraFacing}
//               disabled={isProcessing}
//             >
//               <Text style={styles.text}>Flip</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 styles.scanButton,
//                 isProcessing && styles.disabledButton,
//               ]}
//               onPress={captureImage}
//               disabled={isProcessing}
//             >
//               <Text style={styles.text}>
//                 {isProcessing ? "Processing..." : "Capture"}
//               </Text>
//             </TouchableOpacity>

//             {/* NEW: Pick from gallery */}
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 styles.scanButton,
//                 isProcessing && styles.disabledButton,
//               ]}
//               onPress={pickImageFromGallery}
//               disabled={isProcessing}
//             >
//               <Text style={styles.text}>
//                 {isProcessing ? "Processing..." : "Upload"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </CameraView>

//       {/* Modal to display captured image and result */}
//       <Modal visible={showImageModal} transparent={true} animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {capturedImage && (
//               <Image
//                 source={{ uri: capturedImage.uri }}
//                 style={styles.modalImage}
//               />
//             )}

//             {classificationResult ? (
//               <View style={styles.resultContainer}>
//                 <Text style={styles.resultTitle}>Classification Result:</Text>
//                 <Text style={styles.resultText}>{classificationResult}</Text>
//               </View>
//             ) : (
//               <View style={styles.loadingContainer}>
//                 <Text style={styles.loadingText}>Analyzing image...</Text>
//               </View>
//             )}

//             <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // Keep the existing styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   message: {
//     fontSize: 18,
//     textAlign: "center",
//     margin: 20,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     position: "relative",
//   },
//   gridContainer: {
//     flex: 1,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   gridLine: {
//     position: "absolute",
//     backgroundColor: "rgba(255,255,255,0.4)",
//   },
//   horizontalLine: {
//     top: "33%",
//     width: "100%",
//     height: 1,
//   },
//   verticalLine: {
//     left: "33%",
//     height: "100%",
//     width: 1,
//   },
//   scanLine: {
//     position: "absolute",
//     width: "100%",
//     height: 2,
//     backgroundColor: "#00ff00",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 50,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   button: {
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 25,
//     padding: 15,
//     paddingHorizontal: 25,
//   },
//   scanButton: {
//     backgroundColor: "rgba(0, 150, 0, 0.7)",
//   },
//   disabledButton: {
//     backgroundColor: "rgba(150, 150, 150, 0.7)",
//   },
//   text: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dataDisplay: {
//     position: "absolute",
//     top: 50,
//     width: "100%",
//     alignItems: "center",
//   },
//   dataText: {
//     color: "#00ff00",
//     fontSize: 12,
//     fontFamily: "monospace",
//     marginBottom: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.8)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "#222",
//     borderRadius: 10,
//     overflow: "hidden",
//     alignItems: "center",
//   },
//   modalImage: {
//     width: "100%",
//     height: 300,
//     resizeMode: "cover",
//   },
//   resultContainer: {
//     padding: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   resultTitle: {
//     color: "#00ff00",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   resultText: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   loadingContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "#00ff00",
//     fontSize: 16,
//   },
//   closeButton: {
//     backgroundColor: "#444",
//     padding: 12,
//     borderRadius: 5,
//     marginBottom: 20,
//     marginTop: 10,
//     width: "50%",
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
