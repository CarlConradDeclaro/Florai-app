export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
  exif?: Record<string, any>;
  base64?: string;
}

export interface CameraInstance {
  takePictureAsync: (options?: {
    quality?: number;
    base64?: boolean;
    exif?: boolean;
  }) => Promise<CapturedImage>;
}
