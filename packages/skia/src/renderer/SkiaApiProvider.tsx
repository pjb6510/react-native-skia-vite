import { CanvasKit } from "canvaskit-wasm";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Skia } from "../skia/types/Skia";
import { JsiSkApi } from "../skia/web";
import { useIsMounted } from "../utils/hooks/useIsMounted";

export const SkiaApiContext = createContext<Skia | null>(null);

type SkiaApiProviderProps = {
  CanvasKit: CanvasKit;
  children: ReactNode | ReactNode[];
};

export const SkiaApiProvider: FC<SkiaApiProviderProps> = ({
  children,
  CanvasKit,
}) => {
  const [skia, setSkia] = useState<Skia | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (!CanvasKit) {
      return;
    }

    if (skia) {
      return;
    }

    const newSkia = JsiSkApi(CanvasKit);

    setSkia(newSkia);
  }, [CanvasKit, skia, isMounted]);

  if (!skia) {
    return null;
  }

  return (
    <SkiaApiContext.Provider value={skia}>{children}</SkiaApiContext.Provider>
  );
};
