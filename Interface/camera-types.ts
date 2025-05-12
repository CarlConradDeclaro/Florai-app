export interface CameraInstance {
  takePictureAsync: () => Promise<CapturedImage>;
}

export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
}

export interface ScanAnimationHook {
  scanLineY: any;
  startScan: () => void;
  stopScan: () => void;
}
