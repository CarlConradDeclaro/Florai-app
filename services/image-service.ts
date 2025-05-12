import { BASEURL } from "@/utils/base-url";
import axios from "axios";
import { Alert } from "react-native";

export const classifyImage = async (uri: string): Promise<string | null> => {
  console.log("Preparing to send image to backend...");
  console.log("Image URI to send:", uri);

  const formData = new FormData();
  // @ts-ignore
  formData.append("image", {
    uri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  try {
    console.log("Sending request to classify endpoint...");

    const response = await axios.post(`${BASEURL}/classify/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Classification response received:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
      console.error("Status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    } else {
      console.error("Unknown error uploading image:", error);
    }
    Alert.alert(
      "Classification Failed",
      "Could not classify the image. Please try again."
    );
    return null;
  }
};
