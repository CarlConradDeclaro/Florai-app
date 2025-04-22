import useAxios from "@/hooks/useAxios";
import axios from "axios";

const searchPlants = async (query: string) => {
  const api = useAxios();
  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/plants/search/?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default searchPlants;
