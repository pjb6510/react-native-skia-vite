// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type {
  CanvasKitInitOptions,
  CanvasKit as CanvasKitType,
} from 'canvaskit-wasm';
import CanvasKitInit from 'canvaskit-wasm';
import CanvasKitWasm from 'canvaskit-wasm/bin/canvaskit.wasm?url';

declare global {
  var CanvasKit: CanvasKitType;
}

export const LoadSkiaWeb = async (opts?: CanvasKitInitOptions) => {
  if (window.CanvasKit !== undefined) {
    return window.CanvasKit;
  }

  const option = opts ?? {
    locateFile: () => CanvasKitWasm,
  };

  const CanvasKit = await CanvasKitInit(option);

  // The CanvasKit API is stored on the global object and used
  // to create the JsiSKApi in the Skia.web.ts file.
  window.CanvasKit = CanvasKit;

  return CanvasKit;
};
