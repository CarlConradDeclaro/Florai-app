import { BASEURL } from "@/utils/base-url";
import axios from "axios";
import { Alert } from "react-native";

export const getPredictedImageDetails = async (plant: string) => {
  try {
    const response = await axios.post(
      `${BASEURL}/predicted_image_details/`,
      {
        prompt: plant,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
