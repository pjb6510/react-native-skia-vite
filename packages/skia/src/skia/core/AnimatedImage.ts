import type { DataSourceParam, Skia } from '../types';

import { useRawData } from './Data';

/**
 * Returns a Skia Animated Image object
 * */
export const useAnimatedImage = (
  Skia: Skia,
  source: DataSourceParam,
  onError?: (err: Error) => void,
  managed = true
) => {
  const animatedImgFactory =
    Skia.AnimatedImage.MakeAnimatedImageFromEncoded.bind(Skia.AnimatedImage);

  useRawData(Skia, source, animatedImgFactory, onError, managed);
};
