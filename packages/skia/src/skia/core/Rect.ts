import type { Skia, SkRect, SkRRect } from "../types";
import { isRRect } from "../types";

import { vec } from "./Vector";

export const rect = (
  Skia: Skia,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  "worklet";
  return Skia.XYWHRect(x, y, width, height);
};

export const bounds = (Skia: Skia, rects: SkRect[]) => {
  "worklet";
  const x = Math.min(...rects.map((r) => r.x));
  const y = Math.min(...rects.map((r) => r.y));
  const width = Math.max(...rects.map((r) => r.x + r.width));
  const height = Math.max(...rects.map((r) => r.y + r.height));
  return rect(Skia, x, y, width - x, height - y);
};

export const topLeft = (Skia: Skia, r: SkRect | SkRRect) => {
  "worklet";
  return isRRect(r) ? vec(Skia, r.rect.x, r.rect.y) : vec(Skia, r.x, r.y);
};

export const topRight = (Skia: Skia, r: SkRect | SkRRect) => {
  "worklet";
  return isRRect(r)
    ? vec(Skia, r.rect.x + r.rect.width, r.rect.y)
    : vec(Skia, r.x + r.width, r.y);
};

export const bottomLeft = (Skia: Skia, r: SkRect | SkRRect) => {
  "worklet";
  return isRRect(r)
    ? vec(Skia, r.rect.x, r.rect.y + r.rect.height)
    : vec(Skia, r.x, r.y + r.height);
};
export const bottomRight = (Skia: Skia, r: SkRect | SkRRect) => {
  "worklet";
  return isRRect(r)
    ? vec(Skia, r.rect.x + r.rect.width, r.rect.y + r.rect.height)
    : vec(Skia, r.x + r.width, r.y + r.height);
};
export const center = (Skia: Skia, r: SkRect | SkRRect) => {
  "worklet";
  return isRRect(r)
    ? vec(Skia, r.rect.x + r.rect.width / 2, r.rect.y + r.rect.height / 2)
    : vec(Skia, r.x + r.width / 2, r.y + r.height / 2);
};
