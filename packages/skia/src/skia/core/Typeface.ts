import { useSkiaApi } from "../../renderer/useSkiaApi";
import type { DataSourceParam } from "../types";

import { useRawData } from "./Data";

/**
 * Returns a Skia Typeface object
 * */
export const useTypeface = (
  source: DataSourceParam,
  onError?: (err: Error) => void
) => {
  const { Skia } = useSkiaApi();
  const tfFactory = Skia.Typeface.MakeFreeTypeFaceFromData.bind(Skia.Typeface);

  return useRawData(source, tfFactory, onError);
};
