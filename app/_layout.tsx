import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { SafeAreaView } from "react-native-safe-area-context";
import ConvexClientProvider from "./ConvexClientProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ConvexClientProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Categories" />
          <Stack.Screen name="Search" />
          <Stack.Screen name="ScannedPlants" />
          <Stack.Screen name="Favorites" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ConvexClientProvider>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}
