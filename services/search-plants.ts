import { BASEURL } from "@/utils/base-url";
import axios from "axios";

const searchPlants = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASEURL}/plants/search/?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default searchPlants;
