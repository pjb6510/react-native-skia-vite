import type { SkCanvas } from "../skia/types";

import { SkiaBaseWebView } from "./SkiaBaseWebView";
import type { SkiaPictureViewNativeProps } from "./types";

export class SkiaPictureView extends SkiaBaseWebView<SkiaPictureViewNativeProps> {
  constructor(props: SkiaPictureViewNativeProps) {
    super(props);
  }

  protected renderInCanvas(canvas: SkCanvas): void {
    if (this.props.picture) {
      canvas.drawPicture(this.props.picture);
    }
  }
}
