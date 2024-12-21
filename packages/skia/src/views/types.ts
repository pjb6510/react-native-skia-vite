import { CSSProperties } from "react";
import type { GroupProps } from "../dom/types/Common";
import { RenderNode } from "../dom/types/Node";
import type { SharedValueType } from "../renderer/processors/Animations/Animations";
import type { Skia, SkImage, SkPicture, SkRect, SkSize } from "../skia/types";

export type NativeSkiaViewProps = {
  debug?: boolean;
  opaque?: boolean;
};

export interface DrawingInfo {
  width: number;
  height: number;
  timestamp: number;
}

export interface ISkiaViewApi {
  setJsiProperty: <T>(nativeId: number, name: string, value: T) => void;
  requestRedraw: (nativeId: number) => void;
  makeImageSnapshot: (nativeId: number, rect?: SkRect) => SkImage;
  makeImageSnapshotAsync: (nativeId: number, rect?: SkRect) => Promise<SkImage>;
}

export type OnLayout = ((event: ResizeObserverEntry) => void) | undefined;
export type ViewProps = {
  children?: React.ReactNode;
  onLayout?: OnLayout;
  style?: CSSProperties;
};

export interface SkiaBaseViewProps extends ViewProps {
  /**
   * When set to true the view will display information about the
   * average time it takes to render.
   */
  debug?: boolean;
  /**
   * Pass an animated value to the onSize property to get updates when
   * the Skia view is resized.
   */
  onSize?: SharedValueType<SkSize>;

  opaque?: boolean;
}

export interface SkiaPictureViewNativeProps extends SkiaBaseViewProps {
  picture?: SkPicture;
}

export interface SkiaDomViewNativeProps extends SkiaBaseViewProps {
  Skia: Skia;
  root?: RenderNode<GroupProps>;
}
