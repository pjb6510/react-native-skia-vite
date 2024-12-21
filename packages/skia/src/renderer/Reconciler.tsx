import type { ReactNode } from "react";
import type { OpaqueRoot } from "react-reconciler";
import ReactReconciler from "react-reconciler";

import type { Skia } from "../skia/types";

import { Container } from "./Container";
import { debug as hostDebug, skHostConfig } from "./HostConfig";

const skiaReconciler = ReactReconciler(skHostConfig);

skiaReconciler.injectIntoDevTools({
  bundleType: 1,
  version: "0.0.1",
  rendererPackageName: "react-native-skia-web",
});

export class SkiaRoot {
  private root: OpaqueRoot;
  private container: Container;

  constructor(
    Skia: Skia,
    redraw: () => void = () => {},
    getNativeId: () => number = () => 0
  ) {
    this.container = new Container(Skia, redraw, getNativeId);
    this.root = skiaReconciler.createContainer(
      this.container,
      0,
      null,
      true,
      null,
      "",
      console.error,
      null
    );
  }

  render(element: ReactNode) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skiaReconciler.updateContainer(element as any, this.root, null, () => {
      hostDebug("updateContainer");
    });
  }

  unmount() {
    this.container.unmounted = true;
    skiaReconciler.updateContainer(null, this.root, null, () => {
      hostDebug("unmountContainer");
    });
  }

  get dom() {
    return this.container.root;
  }
}
