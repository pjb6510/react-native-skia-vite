import type { ImageProps } from "../../../dom/types";
import type { SkiaProps } from "../../processors";

export const Image = (props: SkiaProps<ImageProps>) => {
  return <skImage {...props} />;
};
