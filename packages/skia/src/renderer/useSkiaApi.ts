import { useContext } from 'react';
import {
  add,
  bottomLeft,
  bottomRight,
  bounds,
  center,
  createPicture,
  dist,
  listFontFamilies,
  loadData,
  makeImageFromView,
  matchFont,
  neg,
  processTransform2d,
  rect,
  rrect,
  sub,
  topLeft,
  topRight,
  useAnimatedImage,
  useData,
  useFont,
  useFonts,
  useImage,
  useRawData,
  useSVG,
  useTypeface,
  vec,
} from '../skia/core';
import { SkiaApiContext } from './SkiaApiProvider';

export const useSkiaApi = () => {
  const skiaApi = useContext(SkiaApiContext);

  if (!skiaApi) {
    throw new Error('useSkiaApi must be used within a SkiaApiProvider');
  }

  const Utils = {
    // Data
    loadData: loadData.bind(null, skiaApi),

    // Font
    matchFont: matchFont.bind(null, skiaApi),
    listFontFamilies: listFontFamilies.bind(null, skiaApi),

    // Image
    makeImageFromView: makeImageFromView.bind(null, skiaApi),

    // Matrix
    processTransform2d: processTransform2d.bind(null, skiaApi),

    // Picture
    createPicture: createPicture.bind(null, skiaApi),

    // Rect
    rect: rect.bind(null, skiaApi),
    bounds: bounds.bind(null, skiaApi),
    topLeft: topLeft.bind(null, skiaApi),
    topRight: topRight.bind(null, skiaApi),
    bottomLeft: bottomLeft.bind(null, skiaApi),
    bottomRight: bottomRight.bind(null, skiaApi),
    center: center.bind(null, skiaApi),

    // RRect
    rrect: rrect.bind(null, skiaApi),

    // Vector
    vec: vec.bind(null, skiaApi),
    point: vec.bind(null, skiaApi),
    neg: neg.bind(null, skiaApi),
    add: add.bind(null, skiaApi),
    sub: sub.bind(null, skiaApi),
    dist: dist,
  };

  const Hooks = {
    // AnimatedImage
    useAnimatedImage: useAnimatedImage.bind(null, skiaApi),

    // Data
    useRawData: useRawData.bind(null, skiaApi),
    useData: useData.bind(null, skiaApi),

    // Font
    useFont: useFont.bind(null, skiaApi),
    useFonts: useFonts.bind(null, skiaApi),

    // Typeface
    useTypeface: useTypeface.bind(null, skiaApi),

    // Image
    useImage: useImage.bind(null, skiaApi),

    // SVG
    useSVG: useSVG.bind(null, skiaApi),
  };

  return { Skia: skiaApi, Utils, Hooks };
};
