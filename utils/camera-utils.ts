import { CapturedImage } from "@/types/camera-types";
import * as ImagePicker from "expo-image-picker";

export const pickImageFromGallery = async (): Promise<CapturedImage | null> => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageAsset = result.assets[0];
      console.log("Selected image from gallery:", imageAsset.uri);

      return {
        uri: imageAsset.uri,
        width: imageAsset.width || 0,
        height: imageAsset.height || 0,
      };
    }
    return null;
  } catch (error) {
    console.error("Error picking image:", error);
    return null;
  }
};
