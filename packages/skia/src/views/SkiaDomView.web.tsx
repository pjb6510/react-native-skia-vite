import { JsiDrawingContext } from "../dom/types/DrawingContext";
import { SkCanvas } from "../skia/types";

import { SkiaBaseWebView } from "./SkiaBaseWebView";
import type { SkiaDomViewNativeProps } from "./types";

export class SkiaDomView extends SkiaBaseWebView<SkiaDomViewNativeProps> {
  constructor(props: SkiaDomViewNativeProps) {
    super(props);
  }

  protected renderInCanvas(canvas: SkCanvas): void {
    if (this.props.onSize) {
      const { width, height } = this.getSize();
      this.props.onSize.value = { width, height };
    }
    if (this.props.root) {
      const ctx = new JsiDrawingContext(this.props.Skia, canvas);
      this.props.root.render(ctx);
    }
  }
}
