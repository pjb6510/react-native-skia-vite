/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DataModule } from "../skia/types";
import { View } from "./Platform.web";

export interface IPlatform {
  OS: string;
  PixelRatio: number;
  findNodeHandle: (
    componentOrHandle:
      | null
      | number
      | React.Component<any, any>
      | React.ComponentClass<any>
  ) => null;
  resolveAsset: (source: DataModule) => string;
  View: typeof View;
}
