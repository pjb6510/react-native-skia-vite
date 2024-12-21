import { useSkiaApi } from "../../renderer/useSkiaApi";
import type { DataSourceParam } from "../types";

import { useRawData } from "./Data";

export const useSVG = (
  source: DataSourceParam,
  onError?: (err: Error) => void
) => {
  const { Skia } = useSkiaApi();
  const svgFactory = Skia.SVG.MakeFromData.bind(Skia.SVG);

  return useRawData(source, svgFactory, onError);
};
