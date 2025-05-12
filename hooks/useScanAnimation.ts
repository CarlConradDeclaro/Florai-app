import { ScanAnimationHook } from "@/Interface/camera-types";
import { useRef, useState } from "react";
import { Animated } from "react-native";

export const useScanAnimation = (isScanning: boolean): ScanAnimationHook => {
  const scanLineY = useState(new Animated.Value(150))[0];
  const scanAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const startScan = () => {
    if (!isScanning) return;

    scanAnimation.current = Animated.loop(
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
    );

    scanAnimation.current.start();
  };

  const stopScan = () => {
    if (scanAnimation.current) {
      scanAnimation.current.stop();
    }
  };

  return { scanLineY, startScan, stopScan };
};
