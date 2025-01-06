import type { DataSourceParam, Skia } from '../types';

import { useRawData } from './Data';

/**
 * Returns a Skia Typeface object
 * */
export const useTypeface = (
  Skia: Skia,
  source: DataSourceParam,
  onError?: (err: Error) => void
) => {
  const tfFactory = Skia.Typeface.MakeFreeTypeFaceFromData.bind(Skia.Typeface);

  return useRawData(Skia, source, tfFactory, onError);
};
