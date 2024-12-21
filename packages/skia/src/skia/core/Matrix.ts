import type { Skia, Transforms3d } from "../types";
import { processTransform } from "../types";

export const processTransform2d = (Skia: Skia, transforms: Transforms3d) => {
  "worklet";
  return processTransform(Skia.Matrix(), transforms);
};
