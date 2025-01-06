import type { DataSourceParam, Skia } from '../types';

import { useRawData } from './Data';

export const useSVG = (
  Skia: Skia,
  source: DataSourceParam,
  onError?: (err: Error) => void
) => {
  const svgFactory = Skia.SVG.MakeFromData.bind(Skia.SVG);

  return useRawData(Skia, source, svgFactory, onError);
};
