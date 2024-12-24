import type { CSSProperties, RefObject } from "react";
import { useLayoutEffect, useMemo, useRef } from "react";

import type { DataModule } from "../skia/types";

import { OnLayout, ViewProps } from "../views/types";
import type { IPlatform } from "./IPlatform";

// eslint-disable-next-line max-len
// https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/useElementLayout/index.js
const DOM_LAYOUT_HANDLER_NAME = "__reactLayoutHandler";

type Div = HTMLDivElement & {
  __reactLayoutHandler: OnLayout;
};

let resizeObserver: ResizeObserver | null = null;

const getObserver = () => {
  if (resizeObserver == null) {
    resizeObserver = new window.ResizeObserver(function (entries) {
      entries.forEach((entry) => {
        const node = entry.target as Div;
        const onLayout = node[DOM_LAYOUT_HANDLER_NAME];
        if (typeof onLayout === "function") {
          // setTimeout 0 is taken from react-native-web (UIManager)
          setTimeout(() => onLayout(entry), 0);
        }
      });
    });
  }
  return resizeObserver;
};

const useElementLayout = (ref: RefObject<Div>, onLayout: OnLayout) => {
  const observer = getObserver();

  useLayoutEffect(() => {
    const node = ref.current;
    if (node !== null) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node != null && observer != null) {
      if (typeof node[DOM_LAYOUT_HANDLER_NAME] === "function") {
        observer.observe(node);
      } else {
        observer.unobserve(node);
      }
    }
    return () => {
      if (node != null && observer != null) {
        observer.unobserve(node);
      }
    };
  }, [observer, ref]);
};

export const View = ({ children, onLayout, style: rawStyle }: ViewProps) => {
  const style = useMemo(() => (rawStyle ?? {}) as CSSProperties, [rawStyle]);
  const ref = useRef<Div>(null);
  useElementLayout(ref, onLayout);
  const cssStyles = useMemo(() => {
    return {
      alignItems: "stretch" as const,
      backgroundColor: "transparent" as const,
      border: "0 solid black" as const,
      boxSizing: "border-box" as const,
      display: "flex" as const,
      flexBasis: "auto" as const,
      flexDirection: "column" as const,
      flexShrink: 0,
      listStyle: "none" as const,
      margin: 0,
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      position: "relative" as const,
      textDecoration: "none" as const,
      zIndex: 0,
      ...style,
    };
  }, [style]);

  return (
    <div ref={ref} style={cssStyles}>
      {children}
    </div>
  );
};

export const Platform: IPlatform = {
  OS: "web",
  PixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1, // window is not defined on node
  resolveAsset: (source: DataModule) => {
    return source.default;
  },
  findNodeHandle: () => {
    throw new Error("findNodeHandle is not supported on the web");
  },
  View,
};
