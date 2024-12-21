import type { Skia, Vector } from "../types";

export const vec = (Skia: Skia, x = 0, y?: number) => {
  "worklet";
  return Skia.Point(x, y ?? x);
};
export const point = vec;
export const neg = (Skia: Skia, a: Vector) => {
  "worklet";
  return vec(Skia, -a.x, -a.y);
};
export const add = (Skia: Skia, a: Vector, b: Vector) => {
  "worklet";
  return vec(Skia, a.x + b.x, a.y + b.y);
};
export const sub = (Skia: Skia, a: Vector, b: Vector) => {
  "worklet";
  return vec(Skia, a.x - b.x, a.y - b.y);
};
export const dist = (a: Vector, b: Vector) => {
  "worklet";
  return Math.hypot(a.x - b.x, a.y - b.y);
};
