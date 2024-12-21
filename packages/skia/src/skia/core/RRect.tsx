import type { Skia, SkRect } from "../types";

export const rrect = (Skia: Skia, r: SkRect, rx: number, ry: number) => {
  "worklet";
  return Skia.RRectXY(r, rx, ry);
};
