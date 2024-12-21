import { useSkiaApi } from "../../renderer/useSkiaApi";
import type { DataSourceParam } from "../types";

import { useRawData } from "./Data";

/**
 * Returns a Skia Animated Image object
 * */
export const useAnimatedImage = (
  source: DataSourceParam,
  onError?: (err: Error) => void,
  managed = true
) => {
  const { Skia } = useSkiaApi();
  const animatedImgFactory =
    Skia.AnimatedImage.MakeAnimatedImageFromEncoded.bind(Skia.AnimatedImage);

  useRawData(source, animatedImgFactory, onError, managed);
};
