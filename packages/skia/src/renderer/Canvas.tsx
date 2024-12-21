import type {
  ForwardedRef,
  FunctionComponent,
  MutableRefObject,
  ReactNode,
  RefObject,
} from "react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { SkiaDomView } from "../views/SkiaDomView.web";
import type { SkiaBaseViewProps } from "../views/types";

import { SkiaRoot } from "./Reconciler";
import { useSkiaApi } from "./useSkiaApi";

export const useCanvasRef = () => useRef<SkiaDomView>(null);

export interface CanvasProps extends SkiaBaseViewProps {
  ref?: RefObject<SkiaDomView>;
  children: ReactNode;
  mode?: "default" | "continuous";
}
const useOnSizeEvent = (
  resultValue: SkiaBaseViewProps["onSize"],
  onLayout?: (entry: ResizeObserverEntry) => void
) => {
  return useCallback(
    (entry: ResizeObserverEntry) => {
      if (onLayout) {
        onLayout(entry);
      }
      const { width, height } = entry.contentRect;

      if (resultValue) {
        resultValue.value = { width, height };
      }
    },
    [onLayout, resultValue]
  );
};

export const Canvas = forwardRef<SkiaDomView, CanvasProps>(
  (
    {
      children,
      style,
      debug,
      mode = "default",
      onSize: _onSize,
      onLayout: _onLayout,
      ...props
    },
    forwardedRef
  ) => {
    const { Skia } = useSkiaApi();

    const onLayout = useOnSizeEvent(_onSize, _onLayout);
    const innerRef = useCanvasRef();
    const ref = useCombinedRefs(forwardedRef, innerRef);

    const redraw = useCallback(() => {
      innerRef.current?.redraw();
    }, [innerRef]);

    const getNativeId = useCallback(() => {
      const id = -1;
      return id;
    }, [innerRef]);

    const root = useMemo(
      () => new SkiaRoot(Skia, redraw, getNativeId),
      [redraw, getNativeId]
    );

    // Render effect
    useEffect(() => {
      root.render(children);
    }, [children, root, redraw]);

    useEffect(() => {
      return () => {
        root.unmount();
      };
    }, [root]);

    return (
      <SkiaDomView
        Skia={Skia}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        style={style}
        root={root.dom}
        onLayout={onLayout}
        debug={debug}
        {...props}
      />
    );
  }
) as FunctionComponent<CanvasProps & React.RefAttributes<SkiaDomView>>;

/**
 * Combines a list of refs into a single ref. This can be used to provide
 * both a forwarded ref and an internal ref keeping the same functionality
 * on both of the refs.
 * @param refs Array of refs to combine
 * @returns A single ref that can be used in a ref prop.
 */
const useCombinedRefs = <T,>(
  ...refs: Array<MutableRefObject<T> | ForwardedRef<T>>
) => {
  const targetRef = React.useRef<T>(null);
  React.useEffect(() => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }
    });
  }, [refs]);
  return targetRef;
};
