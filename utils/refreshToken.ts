import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refresh_token");

  if (refreshToken) throw new Error("No refresh Token");

  const response = await axios.post("/token/refresh", {
    refresh: refreshToken,
  });

  const newAccestoken = await response.data.access;

  await AsyncStorage.setItem("access_token", newAccestoken);

  return newAccestoken;
};
